import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


const FormMarkdownEditor = ({ label, value, onChange, error, generateByAi, aiLoading, name = "content" }) => (
  <div className="mb-6 relative">
    <Button
      onClick={generateByAi}
      type="button"
      variant="default"
      size="sm"
      className="absolute right-2 -top-2"
      disabled={aiLoading}
    >
      {aiLoading ? <><Spinner className="inline-block mr-1 align-middle" />Generating...</> : 'Generate by AI'}
    </Button>
    <Label htmlFor={name}>{label}</Label>
    <SimpleMDE id={name} value={value} onChange={onChange} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormMarkdownEditor;