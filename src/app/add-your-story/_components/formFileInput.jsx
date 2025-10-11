import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const FormFileInput = ({ label = 'Picture', onChange, error }) => (
  <div className="mb-6">
    <Label htmlFor="picture">{label}</Label>
    <Input
      id="picture"
      type="file"
      accept="image/jpeg,image/png"
      onChange={e => onChange(e.target.files[0])}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormFileInput