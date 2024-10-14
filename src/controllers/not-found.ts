import NotFoundError from '../errors/not-found-error';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function notFound() {
  throw new NotFoundError('Такой страницы не существует');
}

export default notFound;
