import template from './site-header.html';

const siteHeaderComponent = {
    bindings: {
        href: '@xhref'
    },
    template,
    transclude: {
        'logo': 'transcludeLogo',
        'leftNavigation': '?transcludeLeftNavigation',
        'rightNavigation': '?transcludeRightNavigation'
    }
};

export default siteHeaderComponent;
