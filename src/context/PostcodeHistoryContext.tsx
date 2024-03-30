import { createContext, useCallback, useContext, useState } from "react";

interface PostCodeContextProps {
  postCodesHistory: string[];
  addPostcodesToHistory: (postCodes: string[]) => void;
  removePostcodeFromHistory: (postCodes: string) => void;
}

export const PostCodeContext = createContext<PostCodeContextProps>({
  postCodesHistory: [],
  addPostcodesToHistory: () => {},
  removePostcodeFromHistory: () => {},
});

export const PostCodeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [postCodesHistory, setPostCodesHistory] = useState<string[]>([]);

  const addPostcodesToHistory = useCallback(
    (postCodes: string[]) => {
      //save unique values with Set
      setPostCodesHistory((prev) => [...new Set([...prev, ...postCodes])]);
    },
    [setPostCodesHistory]
  );

  const removePostcodeFromHistory = (postCodes: string) => {
    setPostCodesHistory((prev) =>
      prev.filter((postcode) => !postCodes.includes(postcode))
    );
  };

  return (
    <PostCodeContext.Provider
      value={{
        postCodesHistory,
        addPostcodesToHistory,
        removePostcodeFromHistory,
      }}
    >
      {children}
    </PostCodeContext.Provider>
  );
};
export const usePostCodeContext = () => useContext(PostCodeContext);
