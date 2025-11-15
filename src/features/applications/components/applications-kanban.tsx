'use client';

import {
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnList,
  KanbanColumnTitle,
  KanbanDragOverlay,
  KanbanSortableContext,
  KanbanSortableItem,
} from '@/components/kanban';
import { Button } from '@/components/ui/button';
import {
  Active,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  Over,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Application, Status } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { KanbanItem } from './kanban-item';
import { updateApplicationStatus } from '../actions';
import CreateApplicationSheet from './create-application-sheet';
import { ApplicationDetailsSheet } from './application-details-sheet';
import { STATUS_METADATA } from '../status';

type BoardItems = { [k in Status]: string[] };

function applicationsToBoardItems(applications: Application[]): BoardItems {
  const boardItems: BoardItems = {
    saved: [],
    applied: [],
    interview: [],
    offer_received: [],
    hired: [],
  };

  applications.forEach((application) => {
    boardItems[application.status].push(application.id);
  });

  return boardItems;
}

function applicationsAsMap(applications: Application[]): {
  [k: Application['id']]: Application;
} {
  let mappedApplications: { [k: Application['id']]: Application } = {};

  applications.forEach((application) => {
    mappedApplications[application.id] = application;
  });

  return mappedApplications;
}

interface ApplicationsKanbanProps {
  applications: Application[];
}

export function ApplicationsKanban({ applications }: ApplicationsKanbanProps) {
  const [selected, setSelected] = useState<Application['id'] | null>(null);
  const [itemBeingDragged, setItemBeingDragged] = useState<string | null>();
  const [boardItems, setBoardItems] = useState<BoardItems>(
    applicationsToBoardItems(applications),
  );
  const applicationsMap = applicationsAsMap(applications);

  useEffect(() => {
    setBoardItems(applicationsToBoardItems(applications));
  }, [applications]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setItemBeingDragged(String(active.id));
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const columnId = active.data.current?.sortable.containerId;

    if (!over || !columnId) return;

    const isOverItem = over?.data.current?.type === 'item';

    if (isOverItem) {
      const newStatus = over.data.current?.sortable.containerId;
      moveItemInsideColumn(columnId, active, over);
      updateApplicationStatus(String(active.id), newStatus);
    }

    setItemBeingDragged(null);
  }

  function moveItemInsideColumn(columnId: Status, active: Active, over: Over) {
    const oldIndex = boardItems[columnId].indexOf(String(active.id));
    const newIndex = boardItems[columnId].indexOf(String(over.id));

    const columnItems = boardItems[columnId];

    setBoardItems((boardItems) => ({
      ...boardItems,
      [columnId]: arrayMove(columnItems, oldIndex, newIndex),
    }));
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const isOverColumn = over?.data.current?.type === 'column';

    const targetId = isOverColumn
      ? over.id
      : over.data.current?.sortable.containerId;

    const isOverDifferentColumn =
      active.data.current?.sortable.containerId !== targetId;

    if (isOverDifferentColumn) {
      moveItemToTargetColumn(active, targetId);
    }
  }

  function moveItemToTargetColumn(active: Active, targetId: Status) {
    const oldColumnId: Status = active.data.current?.sortable.containerId;
    const activeItemId = active.id;

    const oldColumnWithoutActiveItem = boardItems[oldColumnId].filter(
      (item) => item !== active.id,
    );
    const targetColumnWithActiveItem = [...boardItems[targetId], activeItemId];

    setBoardItems((board) => ({
      ...board,
      [oldColumnId]: oldColumnWithoutActiveItem,
      [targetId]: targetColumnWithActiveItem,
    }));
  }

  console.log({ boardItems, applicationsMap });

  return (
    <>
      <ApplicationDetailsSheet
        application={selected ? applicationsMap[selected] : null}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />

      <KanbanBoard
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
      >
        {Object.entries(boardItems).map(([status, items]) => (
          <KanbanSortableContext key={status} id={status} items={items}>
            <KanbanColumn key={status} id={status}>
              <KanbanColumnHeader className="relative flex items-center gap-3">
                <KanbanColumnTitle>
                  {STATUS_METADATA[status as Status].title}
                </KanbanColumnTitle>
                <span className="bg-accent flex size-5 items-center justify-center rounded-md text-xs">
                  {items.length}
                </span>

                <CreateApplicationSheet defaultStatus={status as Status}>
                  <Button size="icon-sm" variant="outline" className="ml-auto">
                    <Plus />
                  </Button>
                </CreateApplicationSheet>
              </KanbanColumnHeader>
              <KanbanColumnList>
                {items.map((item) => {
                  if (applicationsMap[item]) {
                    return (
                      <KanbanSortableItem
                        id={item}
                        key={item}
                        onClick={() => setSelected(item)}
                      >
                        <KanbanItem application={applicationsMap[item]} />
                      </KanbanSortableItem>
                    );
                  }
                })}
              </KanbanColumnList>
            </KanbanColumn>
          </KanbanSortableContext>
        ))}

        <KanbanDragOverlay>
          {itemBeingDragged && (
            <KanbanItem
              application={applicationsMap[itemBeingDragged]}
              isBeingDragged
            />
          )}
        </KanbanDragOverlay>
      </KanbanBoard>
    </>
  );
}
