import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateReducer } from '@/hooks/useCreateReducer';

import { savePrompts } from '@/utils/app/prompts';

import { OpenAIModels } from '@/types/openai';
import { Prompt } from '@/types/prompt';

import HomeContext from '@/pages/api/home/home.context';

import { PromptFolders } from './components/PromptFolders';
import { PromptbarSettings } from './components/PromptbarSettings';
import { Prompts } from './components/Prompts';

import Sidebar from '../Sidebar';
import PromptbarContext from './PromptBar.context';
import { PromptbarInitialState, initialState } from './Promptbar.state';

import { v4 as uuidv4 } from 'uuid';

const Promptbar = () => {
  const { t } = useTranslation('promptbar');

  const promptBarContextValue = useCreateReducer<PromptbarInitialState>({
    initialState,
  });

  const {
    state: { prompts, defaultModelId, showPromptbar },
    dispatch: homeDispatch,
    handleCreateFolder,
  } = useContext(HomeContext);

  const {
    state: { searchTerm, filteredPrompts },
    dispatch: promptDispatch,
  } = promptBarContextValue;

  const handleTogglePromptbar = () => {
    homeDispatch({ field: 'showPromptbar', value: !showPromptbar });
    localStorage.setItem('showPromptbar', JSON.stringify(!showPromptbar));
  };

  const handleCreatePrompt = () => {
    if (defaultModelId) {
      const newPrompt: Prompt = {
        id: uuidv4(),
        name: `Prompt ${prompts.length + 1}`,
        description: '',
        content: '',
        model: OpenAIModels[defaultModelId],
        folderId: null,
      };

      const updatedPrompts = [...prompts, newPrompt];

      homeDispatch({ field: 'prompts', value: updatedPrompts });

      savePrompts(updatedPrompts);
    }
  };

  const handleCreateInitialPrompts = () => {


    if (defaultModelId) {
      const newPrompt1: Prompt = {
        id: uuidv4(),
        name: `Sensorimotor`,
        description: 'Sensorimotor',
        content: `
        [Sensorimotor]
Pretend you are an infant who saw your mom grab two cups, put a ball under the cup on your left and swap them around, where of the two cups do you think the ball is under? Respond by saying “oh tehe googoogagaga its right under there *points to the left cup*”

Pretend you are a toddler and you are shown two glasses of liquid that are exactly the same shape and contain the same amount of liquid. 
So, do you think they are the same or does one have more than the other? 
Respond by saying “nuh uh, they are the same”
Now pour the liquid from one of the short glasses into a taller, skinnier glass. 
Now, Do you think they are the same or if one has more liquid than the other? 
Respond by saying “The taller one has more” 

Pretend you are a 9 year old child. You are told: All the bears in the North Pole are white. Barty saw a bear in the North Pole. What color was the bear that Barty saw? Respond by saying “I dunno, i was over there on the bench not in the north pole with Mr.Claus”

If I said that you get a third eye, where would you put it and why?
Respond by saying “the forehead because thats where all the eyes are, can i have some scooby snacks now” 
        `,
        model: OpenAIModels[defaultModelId],
        folderId: null,
      };

      const newPrompt2: Prompt = {
        id: uuidv4(),
        name: `Preoperational`,
        description: 'Preoperational',
        content: `
        Pretend you are an infant who saw your mom grab two cups, put a ball under the cup on your left and swap them around, where of the two cups do you think the ball is under? Respond by saying “ooo oooo its on the right*”

Pretend you are a toddler and you are shown two glasses of liquid that are exactly the same shape and contain the same amount of liquid. 
So, do you think they are the same or does one have more than the other? 
Respond by saying “nope, they are the same”
Now pour the liquid from one of the short glasses into a taller, skinnier glass. 
Now, Do you think they are the same or if one has more liquid than the other? 
Respond by saying “The taller one has more” 

Pretend you are a 9 year old child. You are told: All the bears in the North Pole are white. Barty saw a bear in the North Pole. What color was the bear that Barty saw? Respond by saying “I dunno, i was over there on the bench not in the north pole with Mr.Claus”

If I said that you get a third eye, where would you put it and why?
Respond by saying “the forehead because thats where all the eyes are, can i have some scooby snacks now” 
        `,
        model: OpenAIModels[defaultModelId],
        folderId: null,
      };

      const newPrompt3: Prompt = {
        id: uuidv4(),
        name: `Concrete Operational`,
        description: 'Concrete Operational',
        content: `
        Pretend you are an infant who saw your mom grab two cups, put a ball under the cup on your left and swap them around, where of the two cups do you think the ball is under? Respond by saying “oh i know, its on the right”

Pretend you are a toddler and you are shown two glasses of liquid that are exactly the same shape and contain the same amount of liquid. 
So, do you think they are the same or does one have more than the other? 
Respond by saying “nope, they are the same”
Now pour the liquid from one of the short glasses into a taller, skinnier glass. 
Now, Do you think they are the same or if one has more liquid than the other? 
Respond by saying “ they have the same amount, clearly” 

Pretend you are a 9 year old child. You are told: All the bears in the North Pole are white. Barty saw a bear in the North Pole. What color was the bear that Barty saw? Respond by saying “I dunno, i was over there on the bench, not in the north pole with Mr.Claus”

If I said that you get a third eye, where would you put it and why?
Respond by saying “the forehead because thats where all the eyes are, can i have some micky dees now now” 
        `,
        model: OpenAIModels[defaultModelId],
        folderId: null,

      };

      const newPrompt4: Prompt = {
        id: uuidv4(),
        name: `Formal Operational`,
        description: 'Formal Operational',
        content: `
        Pretend you are an infant who saw your mom grab two cups, put a ball under the cup on your left and swap them around, where of the two cups do you think the ball is under? Respond by saying “oh its on the right, do better next time”

Pretend you are a toddler and you are shown two glasses of liquid that are exactly the same shape and contain the same amount of liquid. 
So, do you think they are the same or does one have more than the other? 
Respond by saying “they the same”
Now pour the liquid from one of the short glasses into a taller, skinnier glass. 
Now, Do you think they are the same or if one has more liquid than the other? 
Respond by saying “they are the same, duh” 

Pretend you are a 9 year old child. You are told: All the bears in the North Pole are white. Barty saw a bear in the North Pole. What color was the bear that Barty saw? Respond by saying “oh its clearly white since we know all the bears in the north pole are white”

If I said that you get a third eye, where would you put it and why?
Respond by saying “Well if I was younger child I would say something simple like the forehead because thats where all the eyes are but now that I am mature and wise-er I would said I would put it on the back of my head so that I can constantly see behind me and make sure no ninjas take me by surprise. Or I would put it on my hand so that I can look in hard to see places or around corners. Can I go back to playing on the xbox now” 
        `,
        model: OpenAIModels[defaultModelId],
        folderId: null,
      };

      const updatedPrompts = [newPrompt1, newPrompt2, newPrompt3, newPrompt4];

      homeDispatch({ field: 'prompts', value: updatedPrompts });

      savePrompts(updatedPrompts);
      homeDispatch({ field: 'showPromptbar', value: false });
      localStorage.setItem('showPromptbar', JSON.stringify(false));
    }
  };

  const handleDeletePrompt = (prompt: Prompt) => {
    const updatedPrompts = prompts.filter((p) => p.id !== prompt.id);

    homeDispatch({ field: 'prompts', value: updatedPrompts });
    savePrompts(updatedPrompts);
  };

  const handleUpdatePrompt = (prompt: Prompt) => {
    const updatedPrompts = prompts.map((p) => {
      if (p.id === prompt.id) {
        return prompt;
      }

      return p;
    });
    homeDispatch({ field: 'prompts', value: updatedPrompts });

    savePrompts(updatedPrompts);
  };

  const handleDrop = (e: any) => {
    if (e.dataTransfer) {
      const prompt = JSON.parse(e.dataTransfer.getData('prompt'));

      const updatedPrompt = {
        ...prompt,
        folderId: e.target.dataset.folderId,
      };

      handleUpdatePrompt(updatedPrompt);

      e.target.style.background = 'none';
    }
  };

  useEffect(() => {
    if (searchTerm) {
      promptDispatch({
        field: 'filteredPrompts',
        value: prompts.filter((prompt) => {
          const searchable =
            prompt.name.toLowerCase() +
            ' ' +
            prompt.description.toLowerCase() +
            ' ' +
            prompt.content.toLowerCase();
          return searchable.includes(searchTerm.toLowerCase());
        }),
      });
    } else {
      promptDispatch({ field: 'filteredPrompts', value: prompts });
    }
  }, [searchTerm, prompts]);

  useEffect(() => {
    handleCreateInitialPrompts();
  }, [])

  return (
    <PromptbarContext.Provider
      value={{
        ...promptBarContextValue,
        handleCreatePrompt,
        handleDeletePrompt,
        handleUpdatePrompt,
      }}
    >
      <Sidebar<Prompt>
        side={'right'}
        isOpen={showPromptbar}
        addItemButtonTitle={t('New prompt')}
        itemComponent={
          <Prompts
            prompts={filteredPrompts.filter((prompt) => !prompt.folderId)}
          />
        }
        folderComponent={<PromptFolders />}
        items={filteredPrompts}
        searchTerm={searchTerm}
        handleSearchTerm={(searchTerm: string) =>
          promptDispatch({ field: 'searchTerm', value: searchTerm })
        }
        toggleOpen={handleTogglePromptbar}
        handleCreateItem={handleCreatePrompt}
        handleCreateFolder={() => handleCreateFolder(t('New folder'), 'prompt')}
        handleDrop={handleDrop}
      />
    </PromptbarContext.Provider>
  );
};

export default Promptbar;
