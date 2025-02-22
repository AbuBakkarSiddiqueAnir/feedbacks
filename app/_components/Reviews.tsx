'use client'
import { useState } from "react";
import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const feedbackOptions: Record<number, string[]> = {
  1: ["Very dissatisfied", "Poor service", "Would not recommend"],
  2: ["Needs improvement", "Slow response", "Below expectations"],
  3: ["Average experience", "Okay service", "Could be better"],
  4: ["Good service, but some delays", "Friendly staff", "Clean environment"],
  5: ["Excellent experience!", "Highly recommend", "Great customer service"],
};

const StarFeedback = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);
  const [customFeedback, setCustomFeedback] = useState<string>("");

  const handleCheckboxChange = (option: string) => {
    setSelectedFeedback((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }

    const feedback = selectedFeedback.length > 0 ? selectedFeedback : [customFeedback];
    console.log("Submitted Feedback:", { rating, feedback });

    // Reset form after submission
    setRating(null);
    setSelectedFeedback([]);
    setCustomFeedback("");
  };

  return (
    <div className="w-[60rem] max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Rate Your Experience</h2>

      {/* Star Rating Selection */}
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer ${
              rating && star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* Predefined Feedback Suggestions as Checkboxes */}
      {rating && (
        <div className="space-y-2 mb-4">
          {feedbackOptions[rating]?.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox checked={selectedFeedback.includes(option)} onCheckedChange={() => handleCheckboxChange(option)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* Custom Feedback Input */}
      <Textarea
        className="w-full p-2 border rounded-md"
        placeholder="Or write your own feedback..."
        value={customFeedback}
        onChange={(e) => setCustomFeedback(e.target.value)}
      />

      {/* Submit Button */}
      <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSubmit}>
        Submit Feedback
      </Button>
    </div>
  );
};

export default StarFeedback;
