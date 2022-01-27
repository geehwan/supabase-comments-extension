import { Dropdown, IconPlus, Typography } from '@supabase/ui';
import clsx from 'clsx';
import React, { FC } from 'react';
import useReactions from '../hooks/useReactions';
import Reaction from './Reaction';

interface ReactionSelectorProps {
  activeReactions: Set<string>;
  toggleReaction: (reactionType: string) => void;
}

const ReactionSelector: FC<ReactionSelectorProps> = ({
  activeReactions,
  toggleReaction,
}) => {
  const reactions = useReactions();
  return (
    <Dropdown
      overlay={reactions.data?.map((reaction) => (
        <Dropdown.Item
          key={reaction.type}
          onClick={() => {
            toggleReaction(reaction.type);
          }}
          icon={
            <div
              className={clsx(
                'p-0.5 -ml-2 border-2 rounded-full',
                activeReactions.has(reaction.type)
                  ? 'bg-green-50 border-green-200'
                  : 'bg-transparent border-transparent'
              )}
            >
              <Reaction type={reaction.type} />
            </div>
          }
        >
          <Typography.Text>{reaction.metadata.label}</Typography.Text>
        </Dropdown.Item>
      ))}
    >
      <div className="flex items-center justify-center w-[22px] h-[22px] text-xs rounded-full border-alpha-10 border-2">
        <IconPlus className="w-[12px] h-[12px] text-alpha-50" />
      </div>
    </Dropdown>
  );
};

export default ReactionSelector;
