import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'


const FormInput = ({ label, error, name, autoComplete, ...props }) => {
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} autoComplete={autoComplete} {...props} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput