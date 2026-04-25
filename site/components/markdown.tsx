import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const h1 = (props: ComponentPropsWithoutRef<"h1">) => (
  <h1
    {...props}
    className="display text-4xl sm:text-5xl leading-tight mt-0 mb-6"
  />
);

const h2 = (props: ComponentPropsWithoutRef<"h2">) => (
  <h2
    {...props}
    className="display text-2xl sm:text-3xl mt-14 mb-4 pb-2 border-b border-[var(--ink)]"
  />
);

const h3 = (props: ComponentPropsWithoutRef<"h3">) => (
  <h3
    {...props}
    className="serif text-xl mt-8 mb-3 text-[var(--ink)]"
  />
);

const h4 = (props: ComponentPropsWithoutRef<"h4">) => (
  <h4
    {...props}
    className="serif text-lg mt-6 mb-2 text-[var(--ink)]"
  />
);

const p = (props: ComponentPropsWithoutRef<"p">) => (
  <p
    {...props}
    className="serif text-[17px] leading-relaxed my-4 text-[var(--ink)]"
  />
);

const ul = (props: ComponentPropsWithoutRef<"ul">) => (
  <ul {...props} className="my-4 space-y-2 list-none pl-0" />
);

const ol = (props: ComponentPropsWithoutRef<"ol">) => (
  <ol {...props} className="my-4 space-y-2 list-decimal pl-6 num" />
);

const li = (props: ComponentPropsWithoutRef<"li">) => {
  const { children, className, ...rest } = props;
  const isTask = className?.includes("task-list-item");
  if (isTask) {
    return (
      <li
        {...rest}
        className="serif text-[16px] leading-relaxed flex items-start gap-2 pl-0"
      >
        {children}
      </li>
    );
  }
  return (
    <li
      {...rest}
      className="serif text-[16px] leading-relaxed pl-6 relative before:content-['§'] before:absolute before:left-0 before:text-[var(--accent)] before:font-serif"
    >
      {children}
    </li>
  );
};

const a = (props: ComponentPropsWithoutRef<"a">) => (
  <a
    {...props}
    target={props.href?.startsWith("http") ? "_blank" : undefined}
    rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
    className="link-underline text-[var(--accent)]"
  />
);

const blockquote = (props: ComponentPropsWithoutRef<"blockquote">) => (
  <blockquote
    {...props}
    className="my-6 border-l-2 border-[var(--accent)] pl-5 serif italic text-[var(--ink-muted)]"
  />
);

const hr = () => <hr className="hairline my-10" />;

const strong = (props: ComponentPropsWithoutRef<"strong">) => (
  <strong {...props} className="font-semibold text-[var(--ink)]" />
);

const em = (props: ComponentPropsWithoutRef<"em">) => (
  <em {...props} className="text-[var(--ink-muted)]" />
);

const code = (props: ComponentPropsWithoutRef<"code">) => (
  <code
    {...props}
    className="mono text-[0.86em] bg-[var(--paper-2)] px-1.5 py-0.5 border border-[var(--rule-soft)]"
  />
);

const pre = (props: ComponentPropsWithoutRef<"pre">) => (
  <pre
    {...props}
    className="my-5 mono text-sm bg-[var(--paper-2)] border border-[var(--rule)] p-4 overflow-x-auto leading-relaxed"
  />
);

const table = (props: ComponentPropsWithoutRef<"table">) => (
  <div className="my-6 overflow-x-auto">
    <table {...props} className="editorial" />
  </div>
);

export function Markdown({ content }: { content: string }) {
  return (
    <div className="editorial-md max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1,
          h2,
          h3,
          h4,
          p,
          ul,
          ol,
          li,
          a,
          blockquote,
          hr,
          strong,
          em,
          code,
          pre,
          table,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
