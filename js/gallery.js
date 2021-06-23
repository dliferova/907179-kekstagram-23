import {generatePhotos} from './data.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {openModal, photoNumber} from './photo-detail-modal.js';

const photos = generatePhotos();
renderThumbnails(photos);
openModal(photos[photoNumber]);
