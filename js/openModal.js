import { COMMENTS_STEP } from './constants.js';
import { removeEscapeControl, setEscapeControl } from './escapeControl';

const body = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');
const modalCloseElement = modalElement.querySelector('.big-picture__cancel');
const imageElement = modalElement.querySelector('.big-picture__img img');
const likesElement = modalElement.querySelector('.likes-count');
const descriptionElement = modalElement.querySelector('.social__caption');
const commentsCountElement = modalElement.querySelector('.social__comment-count');
const commentsShownElement = commentsCountElement.querySelector('.social__comment-shown-count');
const commentsTotalElement = commentsCountElement.querySelector('.social__comment-total-count');
const commentsList = modalElement.querySelector('.social__comments');
const commentsLoader = modalElement.querySelector('.social__comments-loader');
const commentTemplate = commentsList.querySelector('.social__comment');

let localComments;
let renderedCommets = 0;

const closeModal = () => {
  modalElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

const showModal = () => {
  modalElement.classList.remove('hidden');
  body.classList.add('modal-open');
  setEscapeControl(closeModal);
};

const renderStatistic = () => {
  commentsShownElement.textContent = renderedCommets;
};

const renderLoader = () => {
  if (localComments.length) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

const renderComments = () => {
  const commentsListFragment = document.createDocumentFragment();
  localComments.splice(0, COMMENTS_STEP).forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImgElement = commentElement.querySelector('.social__picture');
    commentImgElement.src = comment.avatar;
    commentImgElement.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);

    renderedCommets++;
  });
  commentsList.appendChild(commentsListFragment);
  renderStatistic();
  renderLoader();
};

commentsLoader.addEventListener('click', () => {
  renderComments();
});

const renderModal = (picture) => {
  localComments = [...picture.comments];
  renderedCommets = 0;
  commentsList.innerHTML = '';
  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  descriptionElement.textContent = picture.description;
  likesElement.textContent = picture.likes;

  commentsTotalElement.textContent = picture.comments.length;

  renderComments();
};


export const openModal = (data) => {
  showModal();
  renderModal(data);

};

modalCloseElement.addEventListener('click', () => {
  closeModal();
  removeEscapeControl();
});
