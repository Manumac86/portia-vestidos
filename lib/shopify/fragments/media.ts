const mediaFragment = /* GraphQL */ `
  fragment media on Media {
    id
    mediaContentType
    alt
    ... on MediaImage {
      image {
        altText
        url
        width
        height
      }
    }
    ... on Video {
      sources {
        mimeType
        format
        url
        height
        width
      }
      previewImage {
        altText
        url
        width
        height
      }
    }
  }
`;

export default mediaFragment;
