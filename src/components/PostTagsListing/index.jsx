import _ from "lodash";
import Chip from "react-md/lib/Chips";
import { useIntl, Link } from "gatsby-plugin-intl";
import React from "react";
import "./PostTagsListing.scss";

export default ({ tagsEdges, location }) => {

  const intl = useIntl();

  const getTagChip = (tag, location) => {

    const { tagName, count } = tag;

    var active = false;
    var tagUrl = `/blog/tags/${_.kebabCase(tagName)}`;
    if (tagUrl === location) {
      active = true;
      tagUrl = `/blog`;
    }

    return (
      <Link
        key={tagName}
        style={{ textDecoration: "none" }}
        to={tagUrl}
      >
        <Chip
          label={`${tagName} (${count})`}
          className={"tag-chip " + (active ? "active" : "")}
        />
      </Link>
    );
  }

  const getTagsList = () => {
    const tagsList = [];

    tagsEdges.forEach(tagEdge => {
      const tagNode = tagEdge.node.frontmatter;
      if (tagNode.language == intl.locale) {

        tagNode.tags.forEach(tag => {
          const tagIndex = tagsList.findIndex(e => e.tagName == tag);

          if (tagIndex > -1)
            tagsList[tagIndex].count++;
          else
            tagsList.push({
              tagName: tag,
              count: 1
            });
        });
      }
    });
    return tagsList;
  }

  const tagsList = getTagsList();

  return (
    <div className="md-grid md-grid--no-spacing md-cell--middle primary_bg">
      <div id="post-container" className="md-grid md-cell--8 mobile-fix">
        <h3>Tags</h3>
        <div className="left-border-area light-border">
          {tagsList.map(tag => (
            getTagChip(tag, location.pathname)
          ))}
        </div>
      </div>
    </div>
  );
}