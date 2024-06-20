type RecommendationsI18n = {
  title: string;
};

const Recommendations = ({ i18n }: { i18n: RecommendationsI18n }) => {
  if (!i18n || !i18n.title) {
    return null;
  }

  return (
    <div>
      <h3 className={'rr-text'}>{i18n.title}</h3>
      <div>artists lists todo</div>
    </div>
  );
};

export default Recommendations;
