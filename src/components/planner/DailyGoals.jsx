import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DailyGoals({ date }) {
  const [newGoal, setNewGoal] = useState('');
  const qc = useQueryClient();

  const { data: goals = [] } = useQuery({
    queryKey: ['daily-goals', date],
    queryFn: () => base44.entities.DailyGoal.filter({ date }),
  });

  const createGoal = useMutation({
    mutationFn: (title) => base44.entities.DailyGoal.create({ title, date, completed: false }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['daily-goals', date] }),
  });

  const toggleGoal = useMutation({
    mutationFn: ({ id, completed }) => base44.entities.DailyGoal.update(id, { completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['daily-goals', date] }),
  });

  const deleteGoal = useMutation({
    mutationFn: (id) => base44.entities.DailyGoal.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['daily-goals', date] }),
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    createGoal.mutate(newGoal.trim());
    setNewGoal('');
  };

  const done = goals.filter(g => g.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Today's Goals</h2>
        {goals.length > 0 && (
          <span className="text-sm text-muted-foreground">{done}/{goals.length} achieved</span>
        )}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <Input
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
          placeholder="Set a goal for today..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!newGoal.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <div className="space-y-2">
        {goals.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">No goals yet. What do you want to achieve today?</p>
        )}
        {goals.map(goal => (
          <div key={goal.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card group">
            <button onClick={() => toggleGoal.mutate({ id: goal.id, completed: !goal.completed })}>
              {goal.completed
                ? <CheckCircle2 className="w-5 h-5 text-primary" />
                : <Circle className="w-5 h-5 text-muted-foreground" />}
            </button>
            <span className={`flex-1 text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
              {goal.title}
            </span>
            <button
              onClick={() => deleteGoal.mutate(goal.id)}
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