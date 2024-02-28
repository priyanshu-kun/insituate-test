import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";

const randomAvatars = (seed) => {
  const avatar = createAvatar(shapes, {
    seed: seed,
    size: 40,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],
    shape1: [
      "ellipse",
      "ellipseFilled",
      "line",
      "polygon",
      "polygonFilled",
      "rectangle",
      "rectangleFilled",
    ],
    shape1Color: ["0a5b83", "1c799f", "69d2e7", "f1f4dc", "f88c49"],
  });

  const svg = avatar.toString();
  return { workspace_avatar: svg };
};

export default randomAvatars;