import Helper from '@ember/component/helper';

const eq = (params) => params[0] === params[1];
export default Helper.helper(eq);
