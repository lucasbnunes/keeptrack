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
import { Status } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { KanbanItem } from './kanban-item';

const titlesMap: { [k in Status]: string } = {
  applied: 'Applied',
  offer_received: 'Offer received',
  offer_refused: 'Offer refused',
  hired: 'Hired',
  not_selected: 'Not selected',
};

const placeholderApplication = {
  id: 'a1',
  title: 'Front-end engineer',
  applicationDate: new Date(),
  company: 'Xpto',
};

export function ApplicationsKanban() {
  const [itemBeingDragged, setItemBeingDragged] = useState<string | null>();
  const [boardItems, setBoardItems] = useState<{ [k in Status]: string[] }>({
    applied: ['x'],
    not_selected: [],
    offer_received: ['y', 'c'],
    offer_refused: [],
    hired: ['z'],
  });
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const columnId = active.data.current?.sortable.containerId;

    if (!over || !columnId) return;

    const isOverItem = over?.data.current?.type === 'item';

    if (isOverItem) {
      moveItemInsideColumn(columnId, active, over);
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

  return (
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
                {titlesMap[status as Status]}
              </KanbanColumnTitle>
              <span className="bg-accent flex size-5 items-center justify-center rounded-md text-xs">
                {items.length}
              </span>

              <Button size="icon-sm" variant="outline" className="ml-auto">
                <Plus />
              </Button>
            </KanbanColumnHeader>
            <KanbanColumnList>
              {items.map((item) => (
                <KanbanSortableItem key={item} id={item}>
                  <KanbanItem application={placeholderApplication} />
                </KanbanSortableItem>
              ))}
            </KanbanColumnList>
          </KanbanColumn>
        </KanbanSortableContext>
      ))}

      <KanbanDragOverlay>
        {itemBeingDragged && (
          <KanbanItem application={placeholderApplication} isBeingDragged />
        )}
      </KanbanDragOverlay>
    </KanbanBoard>
  );
}
