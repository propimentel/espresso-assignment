import './App.css'

/*
 * TODO: 
 * - Refactor the code to split the page parts in separated compoenents *       This will make the code more readable and easier to maintain.
 */

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { z } from "zod";

import AgentsTable from '../src/components/AgentsTable.tsx';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  status: z.string(),
});

type FormData = z.infer<typeof formSchema>;

import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    status: "active",
  });
  const [formErrors, setFormErrors] = useState<{ [key in keyof FormData]?: string } | null>(null);
  const [agentData, setAgentData] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("agentData") || "[]");
    setAgentData(data);
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors(null);
  };

  const handleSubmit = () => {
    const validationResult = formSchema.safeParse(formData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      const formattedErrors: { [key in keyof FormData]?: string } = {};
      for (const key in errors) {
        formattedErrors[key as keyof FormData] = errors[key as keyof FormData]?.[0];
      }
      setFormErrors(formattedErrors);
      return;
    }
    let updatedData = [...agentData];

    if (editIndex !== null) {
      updatedData[editIndex] = formData;
      setEditIndex(null);
    } else {
      updatedData.push(formData);
    }

    setAgentData(updatedData);
    localStorage.setItem("agentData", JSON.stringify(updatedData));
    setFormData({ name: "", email: "", status: "active" });
  };

  const handleDelete = () => {
    if (editIndex === null) {
      return
    }

    const updatedData = [...agentData];
    updatedData.splice(editIndex, 1);

    setAgentData(updatedData);
    localStorage.setItem("agentData", JSON.stringify(updatedData));
    setFormData({ name: "", email: "", status: "active" });
  };


  const handleReset = () => {
    setFormData({ name: "", email: "", status: "active" });
    setEditIndex(null);
    setFormErrors(null);
  };

  const handleRowClick = (index: number) => {
    setFormData(agentData[index]);
    setEditIndex(index);
    setFormErrors(null);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="space-y-4 p-4 max-w-md mx-auto bg-gray-50 rounded-lg shadow-md">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {formErrors?.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {formErrors?.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prevData) => ({ ...prevData, status: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Add/Update
          </Button>

          <Button onClick={handleDelete} className="w-full">
            Delete
          </Button>

          <Button onClick={handleReset} className="w-full">
            Reset
          </Button>
        </div>

        <div className="p-4 w-[800px] mx-auto">
          <AgentsTable agentData={agentData} handleRowClick={handleRowClick} />
        </div>
      </div>
    </>
  );
}

export default App;
