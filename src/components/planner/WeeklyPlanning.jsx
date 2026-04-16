import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklyPlanning({ weekStart }) {
  const [inputs, setInputs] = useState({});
  const qc = useQueryClient();

  const { data: plans = [] } = useQuery({
    queryKey: ['weekly-plan', weekStart],
    queryFn: () => base44.entities.WeeklyPlan.filter({ week_start: weekStart }),
  });

  const createPlan = useMutation({
    mutationFn: ({ title, day }) => base44.entities.WeeklyPlan.create({ title, day, week_start: weekStart, completed: false }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['weekly-plan', weekStart] }),
  });

  const togglePlan = useMutation({
    mutationFn: ({ id, completed }) => base44.entities.WeeklyPlan.update(id, { completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['weekly-plan', weekStart] }),
  });

  const deletePlan = useMutation({
    mutationFn: (id) => base44.entities.WeeklyPlan.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['weekly-plan', weekStart] }),
  });

  const handleAdd = (e, day) => {
    e.preventDefault();
    const title = inputs[day]?.trim();
    if (!title) return;
    createPlan.mutate({ title, day });
    setInputs(prev => ({ ...prev, [day]: '' }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">This Week's Plan</h2>
      {DAYS.map(day => {
        const dayPlans = plans.filter(p => p.day === day);
        return (
          <div key={day} className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="px-4 py-2.5 bg-muted/40 border-b border-border/50">
              <span className="font-medium text-sm">{day}</span>
              {dayPlans.length > 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {dayPlans.filter(p => p.completed).length}/{dayPlans.length}
                </span>
              )}
            </div>
            <div className="p-3 space-y-2">
              {dayPlans.map(plan => (
                <div key={plan.id} className="flex items-center gap-3 group">
                  <button onClick={() => togglePlan.mutate({ id: plan.id, completed: !plan.completed })}>
                    {plan.completed
                      ? <CheckCircle2 className="w-4 h-4 text-primary" />
                      : <Circle className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  <span className={`flex-1 text-sm ${plan.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {plan.title}
                  </span>
                  <button
                    onClick={() => deletePlan.mutate(plan.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <form onSubmit={(e) => handleAdd(e, day)} className="flex gap-2 mt-2">
                <Input
                  value={inputs[day] || ''}
                  onChange={e => setInputs(prev => ({ ...prev, [day]: e.target.value }))}
                  placeholder={`Add to ${day}...`}
                  className="flex-1 h-8 text-xs"
                />
                <Button type="submit" size="icon" className="h-8 w-8" disabled={!inputs[day]?.trim()}>
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}