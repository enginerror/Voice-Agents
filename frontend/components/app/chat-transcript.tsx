'use client';

import { type HTMLMotionProps, motion } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { ChatEntry } from '@/components/livekit/chat-entry';

const MotionContainer = motion.create('div');
const MotionChatEntry = motion.create(ChatEntry);

const MESSAGE_MOTION_PROPS = {
  initial: {
    opacity: 0,
    translateY: 10,
  },
  animate: {
    opacity: 1,
    translateY: 0,
  },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

interface ChatTranscriptProps {
  hidden?: boolean;
  messages?: ReceivedChatMessage[];
}

export function ChatTranscript({
  hidden = false,
  messages = [],
  ...props
}: ChatTranscriptProps & Omit<HTMLMotionProps<'div'>, 'ref'>) {
  if (hidden) return null;

  return (
    <MotionContainer {...props}>
      {messages.map(({ id, timestamp, from, message, editTimestamp }: ReceivedChatMessage) => {
        const locale = navigator?.language ?? 'en-US';
        const messageOrigin = from?.isLocal ? 'local' : 'remote';
        const hasBeenEdited = !!editTimestamp;

        return (
          <MotionChatEntry
            key={id}
            locale={locale}
            timestamp={timestamp}
            message={message}
            messageOrigin={messageOrigin}
            hasBeenEdited={hasBeenEdited}
            {...MESSAGE_MOTION_PROPS}
          />
        );
      })}
    </MotionContainer>
  );
}
