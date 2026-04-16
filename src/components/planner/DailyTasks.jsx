import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DailyTasks({ date }) {
  const [newTask, setNewTask] = useState('');
  const qc = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ['daily-tasks', date],
    queryFn: () => base44.entities.DailyTask.filter({ date }),
  });

  const createTask = useMutation({
    mutationFn: (title) => base44.entities.DailyTask.create({ title, date, completed: false }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['daily-tasks', date] }),
  });

  const toggleTask = useMutation({
    mutationFn: ({ id, completed }) => base44.entities.DailyTask.update(id, { completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['daily-tasks', date] }),
  });

  const deleteTask = useMutation({
    mutationFn: (id) => base44.entities.DailyTask.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['daily-tasks', date] }),
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    createTask.mutate(newTask.trim());
    setNewTask('');
  };

  const done = tasks.filter(t => t.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Today's Tasks</h2>
        {tasks.length > 0 && (
          <span className="text-sm text-muted-foreground">{done}/{tasks.length} complete</span>
        )}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <Input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!newTask.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <div className="space-y-2">
        {tasks.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">No tasks yet. Add one above!</p>
        )}
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card group">
            <button onClick={() => toggleTask.mutate({ id: task.id, completed: !task.completed })}>
              {task.completed
                ? <CheckCircle2 className="w-5 h-5 text-primary" />
                : <Circle className="w-5 h-5 text-muted-foreground" />}
            </button>
            <span className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </span>
            <button
              onClick={() => deleteTask.mutate(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}