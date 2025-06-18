import ArrayUtils from '../utils/ArrayUtils'
import DataUtils from '../utils/DataUtils'
import FormatadorData from '../utils/FormatadorData'
import FormatadorMoeda from '../utils/FormatadorMoeda'
import NumeroUtils from '../utils/NumeroUtils'
import ObjetoUtils from '../utils/ObjetoUtils'
import StringUtils from '../utils/StringUtils'

const fn = {
    arr: ArrayUtils,
    dt: DataUtils,
    dtfmt: FormatadorData,
    moeda: FormatadorMoeda,
    num: NumeroUtils,
    obj: ObjetoUtils,
    str: StringUtils,
}

export { fn }
