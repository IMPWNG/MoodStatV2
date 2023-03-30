// eslint-disable-next-line import/no-extraneous-dependencies
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';

const PopupAlert = () => {
  return (
    <div className="fixed bottom-0 right-0 m-8">
      <div
        className="rounded-b border-t-4 border-teal-500 bg-teal-100 px-4 py-3 text-teal-900 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="mr-4 h-6 w-6 fill-current text-teal-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Mood Added!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Form = () => {
  const [newDescriptionText, setNewDescriptionText] = useState<string>('');
  const [clicked, setClicked] = useState<number | null>(null);
  const [categoryText, setCategoryText] = useState<string>('');
  const [, setIsAdded] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleAddMood = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const description = newDescriptionText.trim();
    const category = categoryText.trim();

    if (description.length === 0 || category.length === 0 || !clicked) {
      return;
    }

    try {
      const { error } = await supabase.from('stats').insert([
        {
          description,
          rating: clicked,
          user_id: user?.id,
          category,
        },
      ]);

      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      if (error) throw error;

      setIsAdded(true);
      setNewDescriptionText('');
      setCategoryText('');
      setClicked(null);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const handleClickedButton = (rating: number) => {
    setClicked(rating);
    setSelectedRating(rating);
  };

  const getButtonClass = (rating: number) => {
    if (selectedRating === rating) {
      return 'btn-green';
    }
  };

  return (
    <div className="rounded-md border-gray-200 bg-white px-4 py-5">
      {showAlert && <PopupAlert />}
      <div className="text-lg font-semibold text-gray-800">Add a thought</div>
      <div className="mb-2 mt-1">
        <p className="text-sm text-gray-500">
          Here you can add a thought to your journal.
        </p>
      </div>
      <form
        className="grid grid-cols-1 gap-y-2 sm:grid-cols-6 sm:gap-y-5 lg:grid-cols-8"
        onSubmit={handleAddMood}
      >
        <Label htmlFor="comment" colSpanSize="sm:col-start-1 sm:col-span-2">
          Add your thought *
        </Label>
        <FormElement colSpanSize="sm:col-span-4">
          <textarea
            id="textarea"
            rows={5}
            value={newDescriptionText}
            onChange={(e) => setNewDescriptionText(e.target.value)}
          />
        </FormElement>

        <Label colSpanSize="sm:col-start-1 sm:col-span-2">Rate</Label>
        <div className="flex flex-wrap justify-center gap-3 sm:col-span-4 sm:flex-nowrap sm:justify-start sm:space-x-5">
          {Array.from({ length: 10 }, (_, index) => {
            const rating = index + 1;
            return (
              <Button
                key={rating}
                backgroundColor={getButtonClass(rating)}
                onClick={() => handleClickedButton(rating)}
              >
                {rating}
              </Button>
            );
          })}
        </div>

        <Label htmlFor="category" colSpanSize="sm:col-start-1 sm:col-span-2">
          Category *
        </Label>
        <FormElement colSpanSize="sm:col-span-4">
          <input
            type="text"
            id="category"
            value={categoryText}
            onChange={(e) => setCategoryText(e.target.value)}
          />
        </FormElement>

        <div className="sm:col-start-3">
          <button type="submit">
            <Button onClick={() => handleAddMood}>Add</Button>
          </button>
        </div>
      </form>
    </div>
  );
};

export { Form };
