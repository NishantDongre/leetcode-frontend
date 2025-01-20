import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import serverConfig from "../config/serverConfig";
import Topics from "../constants/Topics";
import { ProblemFormData } from "../types/types";

const AddProblem = () => {
  const [formData, setFormData] = useState<ProblemFormData>({
    title: "",
    description: "",
    difficulty: "easy",
    timeLimit: 1000,
    topic: "",
    testCases: [{ input: "", output: "" }],
    codeStubs: [
      {
        language: "c_cpp",
        startSnippet: "",
        userSnippet: "",
        endSnippet: "",
      },
    ],
    actualCode: "",
    editorial: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const problemURL = `${serverConfig.PROBLEM_SERVICE_HOSTNAME}/api/v1/problems`;
      const response = await axios.post(problemURL, formData);
      navigate(`/problem/${response.data.data._id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create problem. Please try again.");
    }
  };

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", output: "" }],
    }));
  };

  const addCodeStub = () => {
    setFormData((prev) => ({
      ...prev,
      codeStubs: [
        ...prev.codeStubs,
        {
          language: "c_cpp",
          startSnippet: "",
          userSnippet: "",
          endSnippet: "",
        },
      ],
    }));
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-zinc-800 rounded-lg p-6 space-y-6 mb-6"
      >
        <h2 className="text-2xl font-bold mb-6">Create New Problem</h2>

        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-zinc-900"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">
                Description (Markdown supported)
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-40 bg-zinc-900"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Difficulty</span>
              </label>
              <select
                className="select select-bordered w-full bg-zinc-900"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    difficulty: e.target.value as "easy" | "medium" | "hard",
                  }))
                }
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Time Limit (ms)</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-zinc-900"
                value={formData.timeLimit}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeLimit: parseInt(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Topic</span>
              </label>
              <select
                className="select select-bordered w-full bg-zinc-900"
                value={formData.topic}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, topic: e.target.value }))
                }
                required
              >
                <option value="">Select Topic</option>
                {Topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Test Cases</h3>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={addTestCase}
            >
              Add Test Case
            </button>
          </div>

          {formData.testCases.map((testCase, index) => (
            <div key={index} className="card p-4 space-y-4 bg-zinc-900">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Test Case #{index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        testCases: prev.testCases.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text bg-zinc-900">Input</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full bg-zinc-900"
                    value={testCase.input}
                    onChange={(e) => {
                      const newTestCases = [...formData.testCases];
                      newTestCases[index].input = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        testCases: newTestCases,
                      }));
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Output</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full bg-zinc-900"
                    value={testCase.output}
                    onChange={(e) => {
                      const newTestCases = [...formData.testCases];
                      newTestCases[index].output = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        testCases: newTestCases,
                      }));
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Stubs */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Code Stubs</h3>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={addCodeStub}
            >
              Add Code Stub
            </button>
          </div>

          {formData.codeStubs.map((stub, index) => (
            <div key={index} className="card bg-zinc-900 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Code Stub #{index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        codeStubs: prev.codeStubs.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Language</span>
                </label>
                <select
                  className="select select-bordered w-full bg-zinc-900"
                  value={stub.language}
                  onChange={(e) => {
                    const newStubs = [...formData.codeStubs];
                    newStubs[index].language = e.target.value as
                      | "c_cpp"
                      | "java"
                      | "python";
                    setFormData((prev) => ({ ...prev, codeStubs: newStubs }));
                  }}
                  required
                >
                  <option value="c_cpp">C/C++</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Start Snippet</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32 font-mono bg-zinc-900"
                  value={stub.startSnippet}
                  onChange={(e) => {
                    const newStubs = [...formData.codeStubs];
                    newStubs[index].startSnippet = e.target.value;
                    setFormData((prev) => ({ ...prev, codeStubs: newStubs }));
                  }}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">User Snippet</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32 font-mono bg-zinc-900"
                  value={stub.userSnippet}
                  onChange={(e) => {
                    const newStubs = [...formData.codeStubs];
                    newStubs[index].userSnippet = e.target.value;
                    setFormData((prev) => ({ ...prev, codeStubs: newStubs }));
                  }}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">End Snippet</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32 font-mono bg-zinc-900"
                  value={stub.endSnippet}
                  onChange={(e) => {
                    const newStubs = [...formData.codeStubs];
                    newStubs[index].endSnippet = e.target.value;
                    setFormData((prev) => ({ ...prev, codeStubs: newStubs }));
                  }}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Editorial */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Editorial</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-40 bg-zinc-900"
            value={formData.editorial}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, editorial: e.target.value }))
            }
          />
        </div>

        {/* Actual Code */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Actual Code</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-40 bg-zinc-900"
            value={formData.actualCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, actualCode: e.target.value }))
            }
          />
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" className="btn btn-primary">
            Create Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProblem;
