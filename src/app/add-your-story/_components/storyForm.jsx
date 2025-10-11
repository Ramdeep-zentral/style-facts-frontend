import React, { useState, useEffect } from "react";
import GlobalApi from "@/service/GlobalApi";
import FormInput from "./formInput";
import FormMarkdownEditor from "./formMarkdownEditor";
import FormFileInput from "./formFileInput";
import FormCategorySelect from "./formCategorySelect";
import FormTagsCheckboxes from "./formTagsCheckboxes";
import FormSubmitButton from "./formSubmitButton";
import { storySchema } from "@/lib/validation-rules";
import SuccessDialog from "./successDialog";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// --- State ---
const initialFormData = {
  title: "",
  excerpt: "",
  content: "",
  image: null,
  category: "",
  tags: [],
};

const StoryForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // --- Effects ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await GlobalApi.GetCategories();
        setCategories(resp.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchTags = async () => {
      try {
        const resp = await GlobalApi.GetTags();
        setTags(resp.data.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchCategories();
    fetchTags();
  }, []);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateByAi = async () => {
    try {
      if (!formData.title) {
        toast.error("Please enter a title to generate content");
        return;
      }
      setAiLoading(true);
      const res = await fetch("/api/blog-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title }),
      });
      const data = await res.json();
      if (data && data.text) {
        setFormData((prev) => ({ ...prev, content: data.text }));
      } else {
        toast.error("AI did not return any content.");
      }
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = storySchema.safeParse(formData);
    if (!result.success) {
      setLoading(false);
      const { fieldErrors } = result.error.flatten((issue) => issue.message);
      setFormErrors(fieldErrors);
      return;
    }
    try {
      let imageId = null;
      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append("files", formData.image);
        const uploadResp = await GlobalApi.UploadImage(formDataImage);
        imageId = uploadResp.data[0]?.id;
      }
      const payload = {
        data: {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          categories: { connect: Array.isArray(formData.category) ? formData.category : [formData.category] },
          tags: { connect: Array.isArray(formData.tags) ? formData.tags : [formData.tags] },
          ...(imageId && { image: imageId }),
        },
      };
      await GlobalApi.SubmitBlog(payload);
      setLoading(false);
      setOpenSuccessDialog(true);
      setFormData(initialFormData);
      setFormErrors({});
    } catch (error) {
      console.error("Error submitting blog:", error.response?.data || error);
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <>
    <h1>Create Your Story</h1>
    <form className="submit-story-form mt-10" onSubmit={handleSubmit}>
      <SuccessDialog
        openSuccessDialog={openSuccessDialog}
        setOpenSuccessDialog={setOpenSuccessDialog}
      />
      <FormInput
        label="Title"
        name="title"
        autoComplete="off"
        value={formData.title}
        onChange={handleChange}
        error={formErrors.title?.[0]}
      />
      <FormInput
        label="Excerpt"
        name="excerpt"
        autoComplete="off"
        value={formData.excerpt}
        onChange={handleChange}
        error={formErrors.excerpt?.[0]}
      />
      <FormMarkdownEditor
        label="Content"
        name="content"
        value={formData.content}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, content: value }))
        }
        generateByAi={generateByAi}
        aiLoading={aiLoading}
        error={formErrors.content?.[0]}
      />
      <FormFileInput
        label="Picture"
        name="picture"
        onChange={(file) => setFormData((prev) => ({ ...prev, image: file }))}
        error={formErrors.image?.[0]}
      />
      <FormCategorySelect
        categories={categories}
        name="category"
        value={formData.category}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, category: value }))
        }
        error={formErrors.category?.[0]}
      />
      <FormTagsCheckboxes
        tags={tags}
        name="tags"
        selectedTags={formData.tags}
        onChange={(newTags) =>
          setFormData((prev) => ({ ...prev, tags: newTags }))
        }
        error={formErrors.tags?.[0]}
      />
      <FormSubmitButton value={loading ? <><Spinner className="inline-block mr-1 align-middle" />Submitting...</> : 'Submit Your Story'} />
    </form>
    </>
  );
};

export default StoryForm;