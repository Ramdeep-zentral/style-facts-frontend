import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

const FormCategorySelect = ({ categories, value, onChange, error }) => (
  <div className="mb-6">
    <Label htmlFor="category-select">Category</Label>
    {/* Hidden input to associate with the label for accessibility */}
    <input id="category-select" type="text" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }} tabIndex={-1} aria-hidden="true" />
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.documentId}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormCategorySelect;