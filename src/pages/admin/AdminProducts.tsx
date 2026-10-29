import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductVariant, CategoryType } from '../../types';
import { formatPrice } from '../../utils/format';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, saveProduct, deleteProduct } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Add/Edit
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formBrand, setFormBrand] = useState('Markhor Atelier');
  const [formCategory, setFormCategory] = useState<CategoryType>('Formal');
  const [formPrice, setFormPrice] = useState<number>(6500);
  const [formOldPrice, setFormOldPrice] = useState<number | undefined>(7500);
  const [formDescription, setFormDescription] = useState('');
  const [formMaterial, setFormMaterial] = useState('100% Genuine Full-Grain Leather, Leather Insole');
  const [formImages, setFormImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsNewArrival, setFormIsNewArrival] = useState(true);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formVariants, setFormVariants] = useState<ProductVariant[]>([
    { size: 40, color: 'Black', stock: 4 },
    { size: 41, color: 'Black', stock: 6 },
    { size: 42, color: 'Black', stock: 8 },
    { size: 43, color: 'Black', stock: 5 },
    { size: 44, color: 'Black', stock: 3 },
  ]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSlug('');
    setFormBrand('Hangu Brand Shoes');
    setFormCategory('Formal');
    setFormPrice(6500);
    setFormOldPrice(7500);
    setFormDescription('Handcrafted genuine leather footwear made in Pakistan with memory foam arch comfort.');
    setFormMaterial('100% Full-Grain Calfskin Upper, Leather Sole');
    setFormImages(['/images/category_formal_oxford_1793279534927.jpg']);
    setFormIsFeatured(false);
    setFormIsNewArrival(true);
    setFormIsActive(true);
    setFormVariants([
      { size: 40, color: 'Black', stock: 4 },
      { size: 41, color: 'Black', stock: 6 },
      { size: 42, color: 'Black', stock: 8 },
      { size: 43, color: 'Black', stock: 5 },
      { size: 44, color: 'Black', stock: 3 },
    ]);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSlug(p.slug);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOldPrice(p.old_price);
    setFormDescription(p.description);
    setFormMaterial(p.material);
    setFormImages(p.images || []);
    setFormIsFeatured(p.is_featured);
    setFormIsNewArrival(p.is_new_arrival);
    setFormIsActive(p.is_active);
    setFormVariants(p.variants?.length ? [...p.variants] : [
      { size: 40, color: 'Black', stock: 5 },
      { size: 41, color: 'Black', stock: 5 },
      { size: 42, color: 'Black', stock: 5 },
    ]);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormImages([...formImages, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
    setFormVariants([...formVariants, { size: 42, color: 'Deep Brown', stock: 5 }]);
  };

  const handleUpdateVariant = (index: number, key: keyof ProductVariant, val: any) => {
    const updated = [...formVariants];
    updated[index] = { ...updated[index], [key]: val };
    setFormVariants(updated);
  };

  const handleRemoveVariant = (index: number) => {
    setFormVariants(formVariants.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setErrorMsg('Product name is required.');
      return;
    }
    if (formPrice <= 0) {
      setErrorMsg('Price must be greater than 0.');
      return;
    }
    if (formImages.length === 0) {
      setErrorMsg('Please add at least one product image URL.');
      return;
    }

    setIsSaving(true);
    try {
      const slug = formSlug.trim() || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const prodData: Product = {
        id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
        name: formName.trim(),
        slug,
        brand: formBrand.trim(),
        category: formCategory,
        price: Number(formPrice),
        old_price: formOldPrice ? Number(formOldPrice) : undefined,
        description: formDescription.trim(),
        material: formMaterial.trim(),
        images: formImages,
        is_featured: formIsFeatured,
        is_new_arrival: formIsNewArrival,
        is_active: formIsActive,
        variants: formVariants
      };

      await saveProduct(prodData);
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
            Shoe Catalog
          </span>
          <h1 className="font-playfair text-3xl font-bold text-[#17140F]">
            Product &amp; Inventory Management
          </h1>
          <p className="text-xs text-[#6B645B] mt-0.5">
            Manage models, pricing in PKR, multi-angle photos, and sizes 40 to 45.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-[#D1112B] hover:bg-[#A80D22] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Shoe</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EDE6DA] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search shoes by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2 pl-9 text-xs focus:outline-none focus:border-[#C9A66B]"
          />
          <Search className="w-4 h-4 text-[#C9A66B] absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs text-[#17140F] focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Formal">Formal Oxfords</option>
            <option value="Loafers">Loafers</option>
            <option value="Casual (Slip-ons)">Casual (Slip-ons)</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Peshawari Chappal">Peshawari Chappal</option>
            <option value="Brogues & Boots">Brogues & Boots</option>
          </select>
          <span className="text-xs text-[#6B645B] font-mono">
            {filteredProducts.length} items
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#EDE6DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0B0D] text-[#F7F3EC]">
              <tr>
                <th className="py-3 px-4 font-semibold text-[#C9A66B]">Shoe</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Total Stock</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE6DA]">
              {filteredProducts.map((p) => {
                const totalStock = p.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
                return (
                  <tr key={p.id} className="hover:bg-[#F7F3EC]/50 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-[#EDE6DA] shrink-0"
                      />
                      <div>
                        <div className="font-bold text-[#17140F]">{p.name}</div>
                        <div className="text-[11px] text-[#6B645B]">{p.brand}</div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-[#17140F]">
                      {p.category}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[#17140F] tabular-nums">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`font-mono font-bold ${totalStock <= 3 ? 'text-[#D1112B]' : 'text-[#17140F]'}`}>
                        {totalStock} pairs
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.is_active ? (
                          <span className="bg-[#138A55]/10 text-[#138A55] text-[10px] font-bold px-2 py-0.5 rounded">
                            Active
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded">
                            Hidden
                          </span>
                        )}
                        {p.is_featured && (
                          <span className="bg-[#C9A66B]/20 text-[#2A1B14] text-[10px] font-bold px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                        {p.is_new_arrival && (
                          <span className="bg-[#0B0B0D] text-[#C9A66B] text-[10px] font-bold px-2 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-[#17140F] hover:text-[#C9A66B] hover:bg-[#EDE6DA] rounded-lg transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-[#6B645B] hover:text-[#D1112B] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE6DA] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-[#6B645B] hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-playfair text-2xl font-bold text-[#17140F] mb-1">
              {editingProduct ? 'Edit Shoe Details' : 'Add New Handcrafted Shoe'}
            </h2>
            <div className="w-8 h-[2px] bg-[#C9A66B] mb-6" />

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-[#D1112B]/10 text-[#D1112B] text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#17140F]">Shoe Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. The Sovereign Wholecut"
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#17140F]">Brand Line *</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#17140F]">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A66B]"
                  >
                    <option value="Formal">Formal</option>
                    <option value="Loafers">Loafers</option>
                    <option value="Casual (Slip-ons)">Casual (Slip-ons)</option>
                    <option value="Sneakers">Sneakers</option>
                    <option value="Peshawari Chappal">Peshawari Chappal</option>
                    <option value="Brogues & Boots">Brogues & Boots</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#17140F]">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#17140F]">Old Price (Discount)</label>
                  <input
                    type="number"
                    value={formOldPrice || ''}
                    onChange={(e) => setFormOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="e.g. 7990"
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">Material &amp; Soling *</label>
                <input
                  type="text"
                  required
                  value={formMaterial}
                  onChange={(e) => setFormMaterial(e.target.value)}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              {/* Image Manager */}
              <div className="space-y-2 pt-2 border-t border-[#EDE6DA]">
                <label className="font-semibold text-[#17140F]">Product Images (URLs)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste image path or URL..."
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="bg-[#0B0B0D] text-[#C9A66B] px-4 py-2 rounded-xl font-bold text-xs"
                  >
                    Add Photo
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {formImages.map((img, idx) => (
                    <div key={idx} className="relative group w-16 h-16 rounded-xl overflow-hidden bg-[#EDE6DA] border border-[#EDE6DA]">
                      <img src={img} alt="preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variants Editor: Size, Color, Stock */}
              <div className="space-y-2 pt-2 border-t border-[#EDE6DA]">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#17140F]">Variants &amp; Stock Count</label>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs text-[#C9A66B] font-bold hover:underline"
                  >
                    + Add Size/Color
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formVariants.map((v, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#F7F3EC] p-2 rounded-xl">
                      <span className="text-[11px] font-bold text-[#6B645B]">Size:</span>
                      <select
                        value={v.size}
                        onChange={(e) => handleUpdateVariant(i, 'size', Number(e.target.value))}
                        className="bg-white border border-[#EDE6DA] rounded-lg px-2 py-1 text-xs"
                      >
                        {[39, 40, 41, 42, 43, 44, 45, 46].map((s) => (
                          <option key={s} value={s}>EU {s}</option>
                        ))}
                      </select>

                      <span className="text-[11px] font-bold text-[#6B645B]">Color:</span>
                      <input
                        type="text"
                        value={v.color}
                        onChange={(e) => handleUpdateVariant(i, 'color', e.target.value)}
                        placeholder="Color"
                        className="w-24 bg-white border border-[#EDE6DA] rounded-lg px-2 py-1 text-xs"
                      />

                      <span className="text-[11px] font-bold text-[#6B645B]">Stock:</span>
                      <input
                        type="number"
                        min="0"
                        value={v.stock}
                        onChange={(e) => handleUpdateVariant(i, 'stock', Number(e.target.value))}
                        className="w-16 bg-white border border-[#EDE6DA] rounded-lg px-2 py-1 text-xs font-mono"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(i)}
                        className="text-red-500 hover:text-red-700 ml-auto p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-[#EDE6DA]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="accent-[#C9A66B]"
                  />
                  <span>Active (Visible on Website)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="accent-[#C9A66B]"
                  />
                  <span>Featured Collection</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsNewArrival}
                    onChange={(e) => setFormIsNewArrival(e.target.checked)}
                    className="accent-[#C9A66B]"
                  />
                  <span>New Arrival Badge</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#EDE6DA] text-[#17140F] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#D1112B] hover:bg-[#A80D22] text-white font-bold"
                >
                  {isSaving ? 'Saving...' : 'Save Product'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
