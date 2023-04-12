/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const PopupAlert = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 m-8 md:bottom-auto md:right-0 md:m-auto">
      <div
        className="mx-auto w-full rounded-lg border-t-4 border-green-500 bg-white px-4 py-3 text-gray-700 shadow-md md:mx-0 md:w-auto"
        role="alert"
      >
        <div className="flex justify-center md:justify-start">
          <div className="py-1">
            <svg
              className="mr-4 h-6 w-6 fill-current text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Mood Added!</p>
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
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [categories, setCategories] = useState<{ category: string }[]>([]);

  const [, setIsAdded] = useState<boolean>(false);
  const [, setCreateCategory] = useState<string[]>([]);

  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch(`/api/mood/?user_id=${user?.id}`);
        const { data } = await res.json();

        const categories = data.map((item: any) => item.category);
        const uniqueCategories = Array.from(new Set(categories));
        setCreateCategory(uniqueCategories as string[]);
        setCategories(data);
      } catch (error: unknown) {
        console.log('error', error);
      }
    }
    getCategories();
  }, [user, setCategories, setCreateCategory]);

  const getUniqueCategories = (categories: { category: string }[]) => {
    const uniqueCategories: string[] = [];
    categories.forEach((categoryObj) => {
      const { category } = categoryObj;
      if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
      }
    });
    return uniqueCategories;
  };

  const handleAddMood = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const description = newDescriptionText.trim();
    const category = categoryText.trim();

    if (description.length < 11 || category.length === 0 || !clicked) {
      return;
    }

    try {
      const { error } = await supabase.from('stats_mood').insert([
        {
          description,
          rating: clicked,
          user_id: user?.id,
          category,
        },
      ]);

      if (error) throw error;

      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories, { category }];
        const uniqueCategories = getUniqueCategories(updatedCategories);
        setCreateCategory(uniqueCategories);
        return updatedCategories;
      });

      setIsAdded(true);
      setNewDescriptionText('');
      setCategoryText('');
      setSelectedRating(null);
      setClicked(null);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error: unknown) {
      console.log('error', error);
    }
  };

  const handleClickedButton = (rating: number) => {
    setClicked(rating);
    setSelectedRating(rating);
  };

  return (
    <div className="form-container mx-auto w-full rounded-md md:w-auto md:max-w-lg">
      {showAlert && <PopupAlert />}
      <h2 className="form-title text-center">Add a Thought</h2>
      <p className="form-subtitle text-center">
        Here you can add a thought to your journal.
      </p>
      <form onSubmit={handleAddMood}>
        <div className="form-field">
          <label htmlFor="comment" className="form-label">
            Add a thought *
          </label>
          <div className="form-comment">
            <textarea
              id="comment"
              rows={5}
              value={newDescriptionText}
              onChange={(e) => setNewDescriptionText(e.target.value)}
              className="form-input mt-4"
              placeholder="Enter your thought here"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Rate *</label>
          <div className="form-rating mb-5 mt-4 justify-center text-center">
            {Array.from({ length: 10 }, (_, index) => {
              const rating = index + 1;
              return (
                <button
                  key={rating}
                  type="button"
                  className={`form-rating-button${
                    selectedRating && rating <= selectedRating
                      ? ' selected'
                      : ''
                  }`}
                  onClick={() => handleClickedButton(rating)}
                >
                  {rating}
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="category" className="form-label">
            Category *
          </label>
          <div className="form-category">
            <input
              type="text"
              id="category"
              value={categoryText}
              onChange={(e) => setCategoryText(e.target.value)}
              className="form-input mt-4"
              placeholder="Select a category or create a new one"
              required
            />
            <div className="form-category-buttons justify-center text-center">
              {getUniqueCategories(categories).map((category, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`form-category-button${
                      category === categoryText ? ' selected' : ''
                    }`}
                    onClick={() => setCategoryText(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="form-submit-button"
          disabled={
            newDescriptionText.length < 10 || !categoryText || !selectedRating
          }
        >
          Add
        </button>
      </form>
    </div>
  );
};

export { Form };
