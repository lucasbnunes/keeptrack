'use client';

import { cn } from '@/lib/utils';
import {
  DndContext,
  DndContextProps,
  DragOverlay,
  DragOverlayProps,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const KanbanSortableContext = SortableContext;

export function KanbanDragOverlay({
  children,
  className,
  ...props
}: DragOverlayProps) {
  return (
    <DragOverlay className={cn('cursor-grabbing', className)}>
      {children}
    </DragOverlay>
  );
}

export function KanbanBoard({ children, ...props }: DndContextProps) {
  return (
    <DndContext {...props}>
      <div className="flex h-full items-start gap-6 overflow-x-auto py-8 transition-[height]">
        {children}
      </div>
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
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'column',
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'min-w-3xs rounded-md border p-4 transition-[height] sm:min-w-xs',
      )}
    >
      {children}
    </div>
  );
}

export function KanbanColumnHeader({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mt-2 mb-6', className)} {...props}>
      {children}
    </div>
  );
}

export function KanbanColumnTitle({
  className,
  children,
  ...props
}: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn('font-semibold', className)} {...props}>
      {children}
    </h3>
  );
}

export function KanbanColumnList({
  className,
  children,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul className={cn('flex min-h-20 flex-col gap-4', className)} {...props}>
      {children}
    </ul>
  );
}

export function KanbanSortableItem({
  children,
  id,
  ...props
}: {
  children: React.ReactNode;
  id: string;
} & React.ComponentProps<'li'>) {
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
      className={cn('touch-none list-none', isDragging && 'invisible')}
      data-dragging={isDragging}
      style={style}
      {...props}
    >
      {children}
    </li>
  );
}
