import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ROLES = ['Therapist', 'Psychiatrist', 'Counsellor', 'GP', 'Support Worker', 'Social Worker', 'Other'];

export default function AddContactModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', role: '', phone: '', email: '', organisation: '', notes: '' });

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-5">Add Professional Contact</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name *</label>
            <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Jane Smith" required />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Role</label>
            <select
              value={form.role}
              onChange={e => set('role', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Select role...</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Organisation / Practice</label>
            <Input value={form.organisation} onChange={e => set('organisation', e.target.value)} placeholder="City Mental Health Clinic" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+44 7700 000000" type="tel" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input value={form.email} onChange={e => set('email', e.target.value)} placeholder="dr@clinic.com" type="email" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Private Notes</label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Appointment times, things to remember..."
              className="flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1" disabled={!form.name.trim()}>Save Contact</Button>
          </div>
        </form>
      </div>
    </div>
  );
}