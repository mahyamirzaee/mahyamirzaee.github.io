// Small helper: in Markdown you can write images as ![text](/images/x.png).
// This adds the site's base folder in front, so the images also work on GitHub Pages.
export default function remarkBase(base = '/') {
  const prefix = base.replace(/\/$/, '');
  return () => (tree) => {
    const walk = (node) => {
      if ((node.type === 'image' || node.type === 'link') && node.url?.startsWith('/') && !node.url.startsWith('//')) {
        if (prefix && !node.url.startsWith(prefix + '/')) node.url = prefix + node.url;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
