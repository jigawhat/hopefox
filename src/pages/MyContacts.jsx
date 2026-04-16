import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Lock, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactCard from '../components/contacts/ContactCard';
import AddContactModal from '../components/contacts/AddContactModal';

export default function MyContacts() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const qc = useQueryClient();

  useEffect(() => {
    base44.auth.me()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  const { data: contacts = [] } = useQuery({
    queryKey: ['mental-health-contacts', user?.email],
    queryFn: () => base44.entities.MentalHealthContact.filter({ owner_email: user.email }),
    enabled: !!user,
  });

  const addContact = useMutation({
    mutationFn: (data) => base44.entities.MentalHealthContact.create({ ...data, owner_email: user.email }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mental-health-contacts', user?.email] });
      setShowModal(false);
    },
  });

  const deleteContact = useMutation({
    mutationFn: (id) => base44.entities.MentalHealthContact.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['mental-health-contacts', user?.email] }),
  });

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center bg-card border border-border/50 rounded-2xl p-10 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-xl font-serif font-bold mb-2">Sign in Required</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your contacts are private and encrypted. Please sign in to access them.
          </p>
          <Button onClick={() => base44.auth.redirectToLogin(window.location.pathname)} className="w-full">
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Private &amp; Secure — only visible to you
          </div>
          <h1 className="text-3xl font-serif font-bold">My Professional Contacts</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Store your therapists, psychiatrists, GPs and other mental health professionals.
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          Add Contact
        </Button>
      </div>

      {/* Contacts grid */}
      {contacts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <UserRound className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="font-medium mb-1">No contacts yet</p>
          <p className="text-sm text-muted-foreground mb-5">Add your mental health professionals for quick access.</p>
          <Button onClick={() => setShowModal(true)} variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add your first contact
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} onDelete={(id) => deleteContact.mutate(id)} />
          ))}
        </div>
      )}

      {showModal && (
        <AddContactModal
          onClose={() => setShowModal(false)}
          onSave={(data) => addContact.mutate(data)}
        />
      )}
    </div>
  );
}