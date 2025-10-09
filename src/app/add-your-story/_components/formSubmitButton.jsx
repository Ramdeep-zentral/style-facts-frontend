import { Input } from '@/components/ui/input';
import React from 'react';

const FormSubmitButton = ({value}) => (
  <Input
    type="submit"
    value={value}
    className="mt-4 cursor-pointer bg-black text-white px-6 py-2 h-auto rounded-none"
    disabled={value === 'Submitting...'}
  />
);

export default FormSubmitButton;