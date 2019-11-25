import _ from "lodash";
import Chip from "react-md/lib/Chips";
import { useIntl, Link } from "gatsby-plugin-intl";
import React from "react";
import "./PostCategoriesListing.scss";

export default ({ categoriesEdges, location }) => {

  const intl = useIntl();

  const getCategoryChip = (category, location) => {

    const { categoryName, count } = category;

    var active = false;
    var categoryUrl = `/blog/categorias/${_.kebabCase(categoryName)}`;
    if (categoryUrl === location) {
      active = true;
      categoryUrl = `/blog`;
    }

    return (
      <Link
        key={categoryName}
        style={{ textDecoration: "none" }}
        to={categoryUrl}
      >
        <Chip
          label={`${intl.formatMessage({ id: `blog.categories.${categoryName}` })} (${count})`}
          className={"category-chip " + (active ? "active" : "")}
        />
      </Link>
    );
  }

  const getCategoriesList = () => {
    const categoriesList = [];

    categoriesEdges.forEach(categoryEdge => {
      const category = categoryEdge.node.frontmatter;
      if (category.language == intl.locale) {

        const categoryIndex = categoriesList.findIndex(e => e.categoryName == category.category);

        if (categoryIndex > -1)
          categoriesList[categoryIndex].count++;
        else
          categoriesList.push({
            categoryName: category.category,
            count: 1
          });
      }
    });
    return categoriesList;
  }

  const categoriesList = getCategoriesList();

  return (
    <div className="md-grid md-grid--no-spacing md-cell--middle primary_bg">
      <div id="post-container" className="md-grid md-cell--8 mobile-fix">
        <h3>{intl.formatMessage({ id: "blog.categories.categories" })}</h3>
        <div className="left-border-area light-border">
          {categoriesList.map(category => (
            getCategoryChip(category, location.pathname)
          ))}
        </div>
      </div>
    </div>
  );
}