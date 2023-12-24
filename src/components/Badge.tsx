import { onCleanup, onMount } from 'solid-js';

type Props = {
  botContainer: HTMLDivElement | undefined;
  poweredByTextColor?: string;
  badgeBackgroundColor?: string;
  characterCount: number; // Accept character count as a prop
};

const defaultTextColor = '#303235';
const characterLimit = 300; // Define character limit here

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined;
  let observer: MutationObserver | undefined;

  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if (
          'id' in removedNode &&
          liteBadge &&
          removedNode.id == 'lite-badge'
        ) {
          console.log("Sorry, you can't remove the brand 😅");
          props.botContainer?.append(liteBadge);
        }
      });
    });
  };

  onMount(() => {
    if (!document || !props.botContainer) return;
    observer = new MutationObserver(appendBadgeIfNecessary);
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    });
  });

  onCleanup(() => {
    if (observer) observer.disconnect();
  });

  return (
    <span style={{
      "font-size": '13px',
      position: 'absolute',
      bottom: 0,
      padding: '10px',
      display: 'flex',
      "justify-content": 'space-between', // This will push the child elements to the edges
      "align-items": 'center', // This will vertically center the child elements
      width: '100%',
      color: props.poweredByTextColor ?? defaultTextColor,
      "background-color": props.badgeBackgroundColor ?? '#ffffff'
    }}>
      {/* Centered content */}
      <span style={{ flex: '1', "text-align": 'center' }}> {/* This will take up the available space */}
        Powered by
        <a
          ref={liteBadge}
          href={'https://jaive.co'}
          target="_blank"
          rel="noopener noreferrer"
          class="lite-badge"
          id="lite-badge"
          style={{ "font-weight": 'bold', color: props.poweredByTextColor ?? defaultTextColor }}
        >
          <span> Jaive</span>
        </a>
      </span>
  
      {/* Right-aligned character count */}
      <span style={{ 
        color: props.characterCount > characterLimit ? 'red' : 'darkgray', // Conditional color based on character count
        "white-space": 'nowrap' 
      }}>
        {`${props.characterCount}/${characterLimit}`}
      </span>
    </span>
  );  
};
