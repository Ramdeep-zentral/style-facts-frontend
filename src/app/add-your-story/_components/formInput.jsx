import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const FormInput = ({ label, error, ...props }) => {
  return (
    <div className="mb-6">
      <Label>{label}</Label>
      <Input {...props} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput