/** Reusable slate header for each chapter: mono kicker, big title, subline. */
export default function ChapterHead({ no, title, sub }) {
  return (
    <div className="chapter-head">
      <div className="chapter-head__kicker mono" data-rv>
        Ch. {no}
      </div>
      <h2 className="chapter-head__title display" data-rv>
        {title}
      </h2>
      {sub && (
        <p className="chapter-head__sub" data-rv>
          {sub}
        </p>
      )}
    </div>
  );
}
