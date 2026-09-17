import React, { useState } from 'react';
import {
  Armchair,
  Plus,
  Edit2,
  Trash2,
  Users,
  CheckCircle,
  X,
  Filter
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export const AdminTablesPage = () => {
  const { tables, addTable, updateTableStatus, updateTable, deleteTable } = useAdmin();

  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [tableToDelete, setTableToDelete] = useState(null);

  const [formData, setFormData] = useState({
    number: '',
    name: '',
    capacity: '4 Guests',
    section: 'Main Lounge',
    status: 'Available'
  });

  const filteredTables = tables.filter((tbl) => {
    if (filterStatus === 'All') return true;
    return tbl.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  const availableCount = tables.filter((t) => t.status === 'Available').length;
  const occupiedCount = tables.filter((t) => t.status === 'Occupied').length;
  const reservedCount = tables.filter((t) => t.status === 'Reserved').length;

  const openAddModal = () => {
    setEditingTable(null);
    setFormData({
      number: `T${String(tables.length + 1).padStart(2, '0')}`,
      name: `Table ${tables.length + 1} (Main Floor)`,
      capacity: '4 Guests',
      section: 'Main Lounge',
      status: 'Available'
    });
    setModalOpen(true);
  };

  const openEditModal = (tbl) => {
    setEditingTable(tbl);
    setFormData({
      number: tbl.number || tbl.id,
      name: tbl.name || '',
      capacity: tbl.capacity || '4 Guests',
      section: tbl.section || 'Main Lounge',
      status: tbl.status || 'Available'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTable) {
      updateTable(editingTable.id, formData);
    } else {
      addTable(formData);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (tableToDelete) {
      deleteTable(tableToDelete.id);
      setTableToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-espresso-800">Café Table Management</h2>
            <p className="text-xs text-warmgray-600">
              Live floor seating grid ({tables.length} total café tables)
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-espresso-800 hover:bg-espresso-700 text-cream-50 rounded-xl text-xs font-bold shadow-soft transition-all"
          >
            <Plus className="w-4 h-4 text-terracotta-400" />
            <span>Add New Table</span>
          </button>
        </div>

        {/* Occupancy Counter & Status Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-cream-100">
          {[
            { label: 'All Tables', value: 'All', count: tables.length, color: 'text-espresso-800' },
            { label: 'Available', value: 'Available', count: availableCount, color: 'text-emerald-700' },
            { label: 'Occupied', value: 'Occupied', count: occupiedCount, color: 'text-terracotta-700' },
            { label: 'Reserved', value: 'Reserved', count: reservedCount, color: 'text-amber-800' }
          ].map((pill) => (
            <button
              key={pill.value}
              onClick={() => setFilterStatus(pill.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                filterStatus === pill.value
                  ? 'bg-espresso-800 text-cream-50 shadow-sm'
                  : 'bg-cream-100 text-warmgray-700 hover:bg-cream-200'
              }`}
            >
              <span>{pill.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                {pill.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTables.map((table) => {
          const isOccupied = table.status === 'Occupied';
          const isAvailable = table.status === 'Available';
          const isReserved = table.status === 'Reserved';

          const cardBorder = isOccupied
            ? 'border-terracotta-300 bg-terracotta-50/20'
            : isReserved
            ? 'border-amber-300 bg-amber-50/20'
            : 'border-emerald-300 bg-emerald-50/10';

          return (
            <div
              key={table.id}
              className={`bg-white rounded-2xl border-2 p-5 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between ${cardBorder}`}
            >
              <div>
                {/* Header with Table number & actions */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-espresso-800 text-cream-50 flex items-center justify-center font-bold text-sm font-sans shadow-soft">
                      {table.number || table.id}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-espresso-800 truncate max-w-[130px]">
                        {table.name}
                      </h3>
                      <span className="text-[11px] text-warmgray-500">{table.section}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(table)}
                      className="p-1 rounded-lg text-warmgray-400 hover:text-espresso-800 hover:bg-cream-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTableToDelete(table)}
                      className="p-1 rounded-lg text-warmgray-400 hover:text-terracotta-600 hover:bg-cream-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Capacity & status pill */}
                <div className="flex items-center justify-between my-3 text-xs">
                  <span className="flex items-center gap-1 text-warmgray-600 font-medium">
                    <Users className="w-3.5 h-3.5 text-coffee-600" />
                    <span>{table.capacity}</span>
                  </span>
                  <StatusBadge status={table.status} type="table" size="sm" />
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="mt-4 pt-3 border-t border-cream-100 flex items-center gap-1.5">
                {['Available', 'Occupied', 'Reserved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateTableStatus(table.id, st)}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                      table.status === st
                        ? 'bg-espresso-800 text-cream-50 border-espresso-800'
                        : 'bg-cream-50 text-warmgray-600 border-cream-200 hover:bg-cream-100'
                    }`}
                  >
                    {st === 'Available' ? 'Free' : st === 'Occupied' ? 'Busy' : 'Booked'}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Table Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-soft-xl border border-cream-200">
            <div className="flex items-center justify-between pb-4 border-b border-cream-100">
              <h3 className="font-serif font-bold text-lg text-espresso-800">
                {editingTable ? 'Edit Table' : 'Add New Table'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-warmgray-400 hover:text-espresso-800 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Table Number Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. T11"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Display Label / Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Table 11 (Garden Gazebo)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Seating Capacity
                  </label>
                  <select
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  >
                    <option value="1-2 Guests">1-2 Guests</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6 Guests">6 Guests</option>
                    <option value="8+ Large Booth">8+ Large Booth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Floor Section
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  >
                    <option value="Main Lounge">Main Lounge</option>
                    <option value="Window View">Window View</option>
                    <option value="Brew Bar">Brew Bar</option>
                    <option value="Outdoor Patio">Outdoor Patio</option>
                    <option value="Work Corner">Work Corner</option>
                    <option value="Library">Library</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Initial Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              <div className="pt-3 border-t border-cream-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-warmgray-700 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-espresso-800 hover:bg-espresso-700 text-cream-50 text-xs font-bold shadow-soft"
                >
                  {editingTable ? 'Save Changes' : 'Create Table'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(tableToDelete)}
        title="Delete Table"
        message={`Are you sure you want to remove table "${tableToDelete?.number}" (${tableToDelete?.name})?`}
        confirmText="Delete Table"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTableToDelete(null)}
      />
    </div>
  );
};

export default AdminTablesPage;
