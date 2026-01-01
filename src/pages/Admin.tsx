import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Package } from '../lib/supabase';
import { signOut } from '../lib/auth';
import { Upload, Trash2, Edit2, Save, X, Mail, Phone, Clock, LogOut } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'packages' | 'contacts'>('packages');
  const [packages, setPackages] = useState<Package[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    duration: '',
    price: '',
  });

  useEffect(() => {
    fetchPackages();
    fetchContacts();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('name');

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting submission. Please try again.');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, packageId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Get current package to find old image
      const pkg = packages.find(p => p.id === packageId);

      // Delete old image if exists
      if (pkg?.image_url) {
        const oldFileName = pkg.image_url.split('/').pop()?.split('?')[0];
        if (oldFileName) {
          await supabase.storage
            .from('package-images')
            .remove([oldFileName]);
        }
      }

      // Upload new image with unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${packageId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('package-images')
        .upload(fileName, file, {
          cacheControl: 'no-cache, no-store, must-revalidate',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('package-images')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('packages')
        .update({ image_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', packageId);

      if (updateError) throw updateError;

      await fetchPackages();
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string | null) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      if (imageUrl) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('package-images').remove([fileName]);
        }
      }

      const { error } = await supabase.from('packages').delete().eq('id', id);
      if (error) throw error;

      await fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Error deleting package. Please try again.');
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      slug: pkg.slug,
      description: pkg.description || '',
      duration: pkg.duration || '',
      price: pkg.price || '',
    });
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      await fetchPackages();
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error updating package. Please try again.');
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.slug) {
      alert('Name and slug are required');
      return;
    }

    try {
      const { error } = await supabase.from('packages').insert([formData]);
      if (error) throw error;

      setFormData({ name: '', slug: '', description: '', duration: '', price: '' });
      await fetchPackages();
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Error creating package. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'packages'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Package Management
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Submissions ({contacts.length})
            </button>
          </nav>
        </div>

        {activeTab === 'packages' && (
          <>
            {/* Create New Package */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Package Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Slug (e.g., kerala)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 md:col-span-2"
              rows={3}
            />
          </div>
          <button
            onClick={handleCreate}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Create Package
          </button>
        </div>

        {/* Package List */}
        <div className="grid grid-cols-1 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image Section */}
                  <div className="md:w-1/3">
                    {pkg.image_url ? (
                      <img
                        src={`${pkg.image_url}?t=${pkg.updated_at}`}
                        alt={pkg.name}
                        className="w-full h-48 object-cover rounded-lg"
                        key={`${pkg.id}-${pkg.updated_at}`}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <label className="mt-2 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
                      <Upload className="h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, pkg.id)}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>

                  {/* Details Section */}
                  <div className="md:w-2/3">
                    {editingId === pkg.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="Duration"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="Price"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Description"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(pkg.id)}
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Save className="h-4 w-4" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 mb-2">Slug: {pkg.slug}</p>
                        {pkg.duration && <p className="text-gray-600 mb-2">Duration: {pkg.duration}</p>}
                        {pkg.price && <p className="text-gray-600 mb-2">Price: {pkg.price}</p>}
                        {pkg.description && <p className="text-gray-700 mb-4">{pkg.description}</p>}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(pkg.id, pkg.image_url)}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          </>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {contacts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">No contact submissions yet.</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                            {contact.email}
                          </a>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                              {contact.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          {new Date(contact.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={contact.status}
                        onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          contact.status === 'new'
                            ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                            : contact.status === 'contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-green-50 text-green-800 border-green-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                    <p className="text-gray-800 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
