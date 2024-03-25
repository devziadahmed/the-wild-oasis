/**
 * @param {Array.<Object>} cabins
 * @param {string} filterValue
 * @returns {Array.<Object>} Returns a filtered cabins object
 */

function filterCabins(cabins, filterValue) {
  switch (filterValue) {
    default:
    case "all":
      return cabins;
    case "with-discount":
      return cabins.filter((cabin) => cabin.discount > 0);
    case "no-discount":
      return cabins.filter((cabin) => cabin.discount === 0);
  }
}

export default filterCabins;
