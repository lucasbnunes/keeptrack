'use client';

import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  closestCenter,
  Active,
  Over,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
  KanbanBoard,
  KanbanColumn,
  KanbanColumnList,
  KanbanColumnTitle,
  KanbanDragOverlay,
  KanbanItem,
  KanbanSortableContext,
  KanbanSortableItem,
} from '@/components/kanban';
import { useState } from 'react';
import { Status } from '@prisma/client';

const titlesMap: { [k in Status]: string } = {
  applied: 'Applied',
  offer_received: 'Offer received',
  offer_refused: 'Offer refused',
  hired: 'Hired',
  not_selected: 'Not selected',
};

export function ApplicationsKanban() {
  const [itemBeingDragged, setItemBeingDragged] = useState<string | null>();
  const [boardItems, setBoardItems] = useState<{ [k in Status]: string[] }>({
    applied: ['x'],
    offer_received: ['y', 'c'],
    offer_refused: [],
    hired: ['z'],
    not_selected: [],
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
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

  function moveItemInsideColumn(
    columnId: keyof typeof boardItems,
    active: Active,
    over: Over,
  ) {
    const oldIndex = boardItems[columnId as keyof typeof boardItems].indexOf(
      String(active.id),
    );
    const newIndex = boardItems[columnId as keyof typeof boardItems].indexOf(
      String(over.id),
    );
    setBoardItems((board) => ({
      ...board,
      [columnId]: arrayMove(
        board[columnId as keyof typeof board],
        oldIndex,
        newIndex,
      ),
    }));
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const isOverColumn = over?.data.current?.type === 'column';

    const targetId = isOverColumn
      ? over.id
      : over.data.current?.sortable.containerId;
    console.log(over);
    const isOverDifferentColumn =
      active.data.current?.sortable.containerId !== targetId;

    if (isOverDifferentColumn) {
      moveItemToTargetColumn(active, targetId);
    }
  }

  function moveItemToTargetColumn(active: Active, targetId: UniqueIdentifier) {
    const activeContainerId = active.data.current?.sortable
      .containerId as keyof typeof boardItems;
    const activeItemId = active.id;

    setBoardItems((board) => ({
      ...board,
      [activeContainerId]: board[activeContainerId].filter(
        (item) => item !== active.id,
      ),
      [targetId]: [...board[targetId as keyof typeof boardItems], activeItemId],
    }));
  }

  function checkIfTargetIsColumn(over: Over) {
    return over.data.current?.type === 'column';
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
            <KanbanColumnTitle>
              {titlesMap[status as keyof typeof boardItems]}
            </KanbanColumnTitle>
            <KanbanColumnList>
              {items.map((item) => (
                <KanbanSortableItem key={item} id={item}>
                  <KanbanItem>{item}</KanbanItem>
                </KanbanSortableItem>
              ))}
            </KanbanColumnList>
          </KanbanColumn>
        </KanbanSortableContext>
      ))}

      <KanbanDragOverlay>
        {itemBeingDragged ? <KanbanItem>{itemBeingDragged}</KanbanItem> : null}
      </KanbanDragOverlay>
    </KanbanBoard>
  );
}
