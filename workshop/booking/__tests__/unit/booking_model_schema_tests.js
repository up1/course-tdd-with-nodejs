const BookingModel = require('../../src/model/booking_model')

describe('Booking schema', () => {

    test('should return a ISO 8601 date and time with valid input', () => {
        const date = '2020/10/15'
        const time = '11:30 AM'

        expect(BookingModel.combineDateTime(date, time))
            .toBe('2020-10-15T11:30:00.000Z')
    })

    test('should return null on a bad date and time', () => {
        const date = '!@#$';
        const time = 'fail';

        expect(BookingModel.combineDateTime(date, time)).toBeNull()
    })

})