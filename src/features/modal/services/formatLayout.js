
export const formatLayout = (layout) => {
    switch (layout) {
        case 'flip':
            return 'flip';
        case 'split':
        case 'planar':
            return 'split';
        case 'transform':
        case 'modal_dfc':
        case 'reversible_card':
        case 'double_faced_token':
        case 'art_series':
            return 'reversible';
        default:
            //   case 'normal':
            //   case 'leveler':
            //   case 'class':
            //   case 'saga':
            //   case 'meld':
            //   case 'adventure':
            //   case 'mutate':
            //   case 'prototype':
            //   case 'scheme':
            //   case 'token':
            //   case 'emblem':
            //   case 'augment':
            //   case 'host':
            //   case 'vanguard':
            return 'normal'
    }
}