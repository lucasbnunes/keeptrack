'use client';

import { cn } from '@/lib/utils';
import {
  DndContext,
  DndContextProps,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const KanbanSortableContext = SortableContext;
export const KanbanDragOverlay = DragOverlay;

export function KanbanBoard({ children, ...props }: DndContextProps) {
  return (
    <DndContext {...props}>
      <div className="flex h-full gap-4">{children}</div>
    </DndContext>
  );
}

export function KanbanColumn({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type: 'column',
    },
  });

  return (
    <ul
      ref={setNodeRef}
      className={cn(
        'border-accent flex h-80 max-w-sm flex-col gap-2 border p-4',
        isOver && 'border-accent-foreground',
      )}
    >
      {children}
    </ul>
  );
}

export function KanbanSortableItem({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'item',
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn('list-none', isDragging && 'invisible')}
      style={style}
    >
      {children}
    </li>
  );
}

export function KanbanItem({ children }: { children: React.ReactNode }) {
  return <div className="border border-amber-400 p-2">{children}</div>;
}
