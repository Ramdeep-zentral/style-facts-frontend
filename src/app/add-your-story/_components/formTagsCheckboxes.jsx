import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

const FormTagsCheckboxes = ({ tags, selectedTags, onChange, error }) => {

  const handleTagChange = (tagId, checked) => {
    const isOn = Boolean(checked)
    const newTags = isOn
      ? [...selectedTags, tagId]
      : selectedTags.filter((d) => d !== tagId)
    onChange(newTags)
  }

  return (
    <div className="mb-6">
      <Label htmlFor="tags">Select your tags</Label>
      {/* Hidden input to associate with the label for accessibility */}
      <input id="tags" type="text" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }} tabIndex={-1} aria-hidden="true" />
      <div className="grid grid-cols-2 gap-2 items-center mt-4">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-start gap-2">
            <Checkbox
              id={`tag-${tag.id}`}
              checked={selectedTags.includes(tag.documentId)}
              onCheckedChange={(checked) =>
                handleTagChange(tag.documentId, checked)
              }
            />
            <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default FormTagsCheckboxes