import React, { ReactNode } from 'react';
import { css } from '@emotion/css';
import { AnimatePresence, motion } from 'framer-motion';

export const Accordion = (props: { isVisible: boolean; children: ReactNode }) => {
  return (
    <AnimatePresence initial={false}>
      {props.isVisible && (
        <motion.div
          key="content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          className={css({ overflow: 'hidden' })}
        >
          <motion.div
            transition={{ duration: 0.3 }}
            className={css({ transformOrigin: 'top center' })}
          >
            {props.children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
