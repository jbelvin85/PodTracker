import React, { useState, useEffect } from 'react';
import { useDecks } from '../hooks/useDecks';

interface ScryfallCard {
  id: string;
  name: string;
  image_uris?: { art_crop: string; };
  card_faces?: [{ image_uris?: { art_crop: string; }; }];
  keywords?: string[];
}

const DecksPage = () => {
  const { decks, isLoading, isError, createDeck, updateDeck, deleteDeck, loading } = useDecks();
  const [newDeckData, setNewDeckData] = useState({ name: '', description: '' });
  const [editingDeck, setEditingDeck] = useState<any>(null);
  const [showCreateDeckForm, setShowCreateDeckForm] = useState(false);

  const [commanderSearchQuery, setCommanderSearchQuery] = useState('');
  const [commanderSearchResults, setCommanderSearchResults] = useState<ScryfallCard[]>([]);
  const [selectedCommanders, setSelectedCommanders] = useState<ScryfallCard[]>([]);
  const [externalLinks, setExternalLinks] = useState<string[]>(['']);

  // Debounce for Scryfall search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (commanderSearchQuery.length < 3) {
        setCommanderSearchResults([]);
        return;
      }
      try {
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(commanderSearchQuery)}+is%3Acommander`);
        const data = await response.json();
        if (data.data) {
          setCommanderSearchResults(data.data);
        } else {
          setCommanderSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching data from Scryfall:', error);
        setCommanderSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [commanderSearchQuery]);

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewDeckData({ ...newDeckData, [e.target.name]: e.target.value });
  };

  const addCommanderToSelection = (card: ScryfallCard) => {
    // Basic logic for now, full partner logic will be in Phase 2
    if (selectedCommanders.length < 2 && !selectedCommanders.some(c => c.id === card.id)) {
      setSelectedCommanders([...selectedCommanders, card]);
      setCommanderSearchQuery(''); // Clear search input
      setCommanderSearchResults([]); // Clear search results
    }
  };

  const removeCommander = (cardId: string) => {
    setSelectedCommanders(selectedCommanders.filter(card => card.id !== cardId));
  };

  const handleExternalLinkChange = (index: number, value: string) => {
    const newLinks = [...externalLinks];
    newLinks[index] = value;
    setExternalLinks(newLinks);
  };

  const addExternalLink = () => {
    setExternalLinks([...externalLinks, '']);
  };

  const removeExternalLink = (index: number) => {
    const newLinks = externalLinks.filter((_, i) => i !== index);
    setExternalLinks(newLinks);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For Phase 1, just pass commander names and external links as strings
    await createDeck({
      ...newDeckData,
      commander: selectedCommanders.map(c => c.name).join(' // '), // Join names for now
      externalLinks: externalLinks.filter(link => link.trim() !== ''),
    });
    setNewDeckData({ name: '', description: '' });
    setSelectedCommanders([]);
    setExternalLinks(['']);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingDeck({ ...editingDeck, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeck) {
      await updateDeck(editingDeck.id, editingDeck);
      setEditingDeck(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      await deleteDeck(id);
    }
  };

  if (isLoading) return <p>Loading decks...</p>;
  if (isError) return <p>Error loading decks.</p>;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 bg-background text-text-primary">
      <h1 className="text-4xl font-bold text-text-primary mb-8 text-center">Manage Your Decks</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateDeckForm(!showCreateDeckForm)}
          className="px-6 py-2 bg-button-primary-bg text-button-primary-text font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          {showCreateDeckForm ? 'Hide Add Deck Form' : 'Add New Deck'}
        </button>
      </div>

      {showCreateDeckForm && (
        <div className="bg-card-background p-6 md:p-8 rounded-xl shadow-lg mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">Create New Deck</h2>
          <form onSubmit={handleCreateSubmit}>
            {/* Deck Name and Description */}
            <div className="mb-6">
              <label htmlFor="deckName" className="block text-sm font-medium text-text-secondary mb-2">Deck Name</label>
              <input
                type="text"
                id="deckName"
                name="name"
                value={newDeckData.name}
                onChange={handleCreateChange}
                className="w-full p-3 rounded-lg bg-input-bg border border-input-border focus:outline-none focus:border-accent"
                placeholder="e.g., Krenko's Goblins"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="deckDescription" className="block text-sm font-medium text-text-secondary mb-2">Description</label>
              <textarea
                id="deckDescription"
                name="description"
                rows={4}
                value={newDeckData.description}
                onChange={handleCreateChange}
                className="w-full p-3 rounded-lg bg-input-bg border border-input-border focus:outline-none focus:border-accent"
                placeholder="A brief description of your deck..."
              ></textarea>
            </div>

            {/* Commander Search Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">Commander</h3>
              <label htmlFor="commanderSearch" className="block text-sm font-medium text-text-secondary mb-2">Search for your Commander</label>
              <div className="relative mb-4">
                <input
                  type="text"
                  id="commanderSearch"
                  className="w-full p-3 rounded-lg bg-input-bg border border-input-border focus:outline-none focus:border-accent"
                  placeholder="e.g., Korvold, Fae-Cursed King"
                  value={commanderSearchQuery}
                  onChange={(e) => setCommanderSearchQuery(e.target.value)}
                />
                {commanderSearchResults.length > 0 && commanderSearchQuery.length >= 3 && (
                  <div className="absolute z-10 w-full bg-card-background border border-border rounded-lg mt-1 max-h-60 overflow-y-auto scrollbar-hidden">
                    {commanderSearchResults.map((card) => (
                      <div
                        key={card.id}
                        className="p-2 cursor-pointer hover:bg-input-border"
                        onClick={() => addCommanderToSelection(card)}
                      >
                        {card.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div id="selectedCommanders" className="flex flex-wrap gap-4 mt-4">
                {selectedCommanders.map(card => (
                  <div key={card.id} className="relative w-36 h-48 rounded-lg overflow-hidden border-2 border-accent group">
                    <img src={card.image_uris?.art_crop || card.card_faces?.[0]?.image_uris?.art_crop || ''} alt={card.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button type="button" className="text-white hover:text-red-400" onClick={() => removeCommander(card.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 bg-card-background bg-opacity-50 text-text-primary text-xs px-1 rounded">{card.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">External Links</h3>
              <div id="externalLinksContainer" className="space-y-4">
                {externalLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="linkUrl"
                      className="w-full p-3 rounded-lg bg-input-bg border border-input-border focus:outline-none focus:border-accent"
                      placeholder="URL (e.g., Moxfield, Archidekt)"
                      value={link}
                      onChange={(e) => handleExternalLinkChange(index, e.target.value)}
                    />
                    <button type="button" className="text-red-500 hover:text-red-400 focus:outline-none" onClick={() => removeExternalLink(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.214 21H7.786A2 2 0 015.867 19.142L5 7m14 0H5m4 0V3a1 1 0 011-1h4a1 1 0 011 1v4M10 11v6m4-6v6" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" id="addLinkBtn" className="mt-4 px-4 py-2 bg-button-primary-bg text-button-primary-text rounded-full hover:bg-green-700 transition-colors duration-200">
                Add Another Link
              </button>
            </div>

            {/* Save Button and Cancel Button */}
            <div className="flex justify-end space-x-4"> {/* Added space-x-4 for spacing */}
              <button
                type="button" // Changed to type="button" to prevent form submission
                onClick={() => {
                  setShowCreateDeckForm(false); // Hide the form
                  setNewDeckData({ name: '', description: '' }); // Reset form data
                  setSelectedCommanders([]); // Clear selected commanders
                  setExternalLinks(['']); // Clear external links
                }}
                className="px-8 py-3 bg-button-secondary-bg text-button-secondary-text font-bold rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-lg"
              >
                Cancel
              </button>
              <button type="submit" className="px-8 py-3 bg-button-primary-bg text-button-primary-text font-bold rounded-full hover:bg-green-700 transition-colors duration-200 shadow-lg" disabled={loading}>
                {loading ? 'Saving...' : 'Save Deck'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Deck List */}
      <h2 className="text-xl font-semibold mb-2 text-text-primary">Your Decks</h2>
      {decks && decks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <div key={deck.id} className="p-4 border border-border rounded shadow-sm bg-card-background">
              {editingDeck && editingDeck.id === deck.id ? (
                // Edit Form
                <form onSubmit={handleUpdateSubmit}>
                  <div className="mb-2">
                    <label className="block text-text-secondary">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editingDeck.name}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded-lg bg-input-bg border border-input-border focus:outline-none focus:border-accent"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-text-secondary">Commander</label>
                    <input
                      type="text"
                      name="commander"
                      value={editingDeck.commander}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded-lg bg-input-bg border border-input-border focus:outline-none focus:border-accent"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-text-secondary">Description (Optional)</label>
                    <textarea
                      name="description"
                      value={editingDeck.description}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded-lg bg-input-bg border border-input-border focus:outline-none focus:border-accent"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-button-primary-bg text-button-primary-text p-2 rounded mr-2" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Deck'}
                  </button>
                  <button type="button" onClick={() => setEditingDeck(null)} className="bg-button-secondary-bg text-button-secondary-text p-2 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                // Display Deck
                <>
                  <h3 className="text-lg font-bold text-text-primary">{deck.name}</h3>
                  <p className="text-text-secondary">Commander: {deck.commander}</p>
                  {deck.description && <p className="text-text-secondary">Description: {deck.description}</p>}
                  <div className="mt-4">
                    <button
                      onClick={() => setEditingDeck(deck)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(deck.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary">No decks found. Create one above!</p>
      )}
    </div>
  );
};

export default DecksPage;
