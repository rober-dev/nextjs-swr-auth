// import routes from '../../routes.json';
import i18nConfig from '../../i18n.json';

const { allLanguages, defaultLanguage } = i18nConfig;

function replaceParams(currentTranslatedRoute, query, asPath) {
  const params = Object.keys(query).map(k => {
    return { key: `:${k}*`, value: query[k] };
  });
  params.forEach(({ key, value }) => {
    currentTranslatedRoute = currentTranslatedRoute.replace(key, value);
  });

  let queryParams = '';
  if (asPath.indexOf('?') > -1) {
    queryParams = asPath.substr(asPath.indexOf('?')) || '';
  }

  return currentTranslatedRoute + queryParams;
}

function removeLang(path) {
  if (path.length < 4) {
    return path;
  }

  const lang = path.substr(0, 4);
  if (lang[0] === '/' && lang[3] === '/') {
    return path.substr(3);
  }

  return path;
}

export const getTranslatedLink = (lng, router) => {
  try {
    const { pathname, asPath, query } = router;

    // Check language is valid
    if (allLanguages.indexOf(lng) === -1) {
      return '/';
    }

    // Remove lang from pathname
    let currentPath = removeLang(pathname);

    if (pathname.indexOf('[') > -1) {
      currentPath = currentPath.replace('[', ':').replace(']', '*');
    }

    return replaceParams(currentTranslatedRouteSource, query, asPath);
  } catch (err) {
    console.error('Error trying get translated link', { lng, router, err });
    return '/';
  }
};
