/**
 * DatePicker and TimePicker widgets
 */
var calendar = { };

// --------------------------------------------- Date/Time Picker Parent ---------------------------------------------

calendar.DateTimePicker = Class.create();

/**
 * Constants used for the date time pickers
 */
calendar.DateTimePicker.Constants =
{
  DATE_TYPE: 'date',
  TIME_TYPE: 'time',
  TIME_DELIMITER: ':',
  TYPE_DATE_PICKER: 'dp_',
  TYPE_TIME_PICKER: 'tp_' ,

  // Delimiters used for the internal date time string "yyyy-MM-dd HH:mm:ss"
  INTERNAL_DATE_DELIMITER: '-',
  INTERNAL_TIME_DELIMITER: ':',
  INTERNAL_DATE_TIME_SPACER: ' '
};

calendar.DateTimePicker.prototype = {

  /**
   * An encapsulation of the parent of the Date & Time picker widgets
   * @param popupElementStr           Id to the pop up element for date or time pop up boxes
   * @param basePickerNameStr         String value for the base picker name.
   * @param pairBasePickerNameStr     String value for the 2nd picker name (for the date range picker case).
   *                                  The pair element id prefix and suffix string (if current type is start,
   *                                  the pair element is end, and vice versa).
   *                                  May be empty string.
   * @param typeStr                   String values "start" or "end" (for the date range picker case).
   *                                  May be empty string.
   * @param inputTextElementIdStr     Id to the input text element for the date or time manual input
   * @param pairInputTextElementIdStr Id to the input text element for the date (if current is time) or
                                      time (if current id date) manual input
   * @param allowEmpty                Boolean string for whether input boxes for the picker may be empty.
   * @param filterOutFutureYear       Boolean string for whether future dates should be BLOCKED from selection.
   * @param externalValidateJsCallback   (optional) Function handle of external validation JavaScript callback
   * @param timeZoneOffset            Server timezone offset from UTC in milliseconds
   * @param checkBoxFieldId           Checkbox Field id associated with the date picker
   */
  initialize: function( popupElementStr, basePickerNameStr, pairBasePickerNameStr, typeStr,
                        inputTextElementIdStr, pairInputTextElementIdStr,
                        allowEmpty, filterOutFutureYear, externalValidateJsCallback,
                        timeZoneOffset, checkBoxFieldId )
  {
    // element to the entire date or time picker
    this.popupElement = $(popupElementStr);

    // the immediate DOM form element surrounding the date or time picker
    this.formElement = (this.popupElement).up('form');

    // "start" or "end" type for the date range picker case, or "" for the date picker case
    this.type = typeStr;

    // the id value of the hidden internal date time input element - should be unique
    //this.baseElement = basePickerNameStr + this.type;

    // hidden input element containing the date time in the internal format
    this._baseElement = $(basePickerNameStr + this.type);

    this.basePickerName = basePickerNameStr;

    // set the checkbox element -- for datePicker tag, it's null, for dateRangePicker, it's not null unless showcheckbox is false
    if ( typeStr == "")
    {
      this.checkboxType = $(checkBoxFieldId);
    }
    else
    {
      this.checkboxType = $(this.type + "_" + basePickerNameStr);
    }

    // input text element where users can type in the date or the time
    this.inputTextElement = $(inputTextElementIdStr);
    
    // listening on user's direct edit of the date/time text input box
    this.inputTextElement.observe( 'change', this.onCalendarDateTimeChange.bindAsEventListener( this, true ) );
    
    // pair input text element - if this is date input, the pair is time input, and vice versa
    this.pairInputTextElement = $(pairInputTextElementIdStr);

    this._allowEmpty = allowEmpty;

    // whether future date and times than current date time should not be allowed
    this._allowFutureDateTime = ( filterOutFutureYear == "true" ) ? false : true;

    /* date range picker data members */

    var pairTypeStr = "no_pair_type_string"; // setting this to a fairly unique value to avoid loading the wrong element later
    if( this.type == "start" ) { pairTypeStr = "end"; }
    else if ( this.type == "end" ) { pairTypeStr = "start"; }

    // the element to the checkbox of the range picker's pair
    this.pairCheckboxElement = $(pairTypeStr + "_" + pairBasePickerNameStr);

    // the element to the hidden input containing the date time in the internal format for the range picker's pair
    this.pairHiddenInternalDateTimeInputElement = $(pairBasePickerNameStr + pairTypeStr);

    this.externalValidateJsCallback = externalValidateJsCallback;

    // Server timezone offset from UTC in milliseconds
    this.serverTimeZoneOffset = timeZoneOffset;

    if (this.inputTextElement)
    {
      this._errorDivId = this.inputTextElement.previous('.dateTimeErrorDiv');
    }
  },

  /**
   * Returns string array of the localized AM PM strings of the current locale in context
   */
  getLocalizedAmPmStrArr: function()
  {
    var ampmStr = page.bundle.getString("LOCALE_SETTINGS.AM_PM.00522");
    return ampmStr.split(" ");
  },

  /**
   * Returns localized AM string
   */
  getLocalizedAmStr: function()
  {
    var ampmStrArr = this.getLocalizedAmPmStrArr();
    return ampmStrArr[0];
  },

  /**
   * Returns localized PM string
   */
  getLocalizedPmStr: function()
  {
    var ampmStrArr = this.getLocalizedAmPmStrArr();
    return ampmStrArr[1];
  },

  /**
   * Set the current internal date time hidden element value to empty and
   * clear the input text box of the pair input text element.
   *
   * For example, if the current input box is the date, then the
   * time input box will be cleared by this method, and vice versa.
   *
   * This should be called when allow empty is true and the user clears the current input box.
   */
  setEmpty: function()
  {
    if( this.pairInputTextElement )
    {
      this.pairInputTextElement.value = "";
    }
    this.setInternalDateTimeElementValue( "" );
  },

  /**
   * Indicates whether this picker allows or not empty value
   */
  setAllowEmpty: function( allowEmpty )
  {
    this._allowEmpty = allowEmpty?"true":"false";
  },

  /**
   * Set the current internal date time element value to the given string.
   *
   * @param internalDateTimeString date time string in the internal format
   */
  setInternalDateTimeElementValue: function( internalDateTimeString )
  {
    this._baseElement.value = internalDateTimeString;
  },

  /**
   * Returns a string in the following format to be used as an internal value for the pickers:
   * YYYY-M-DD HH:MM:00
   *
   * For example: 2008-2-11 13:58:00
   *
   * @param arg dynamic list of arguments starting with a type; the possible allowed list is:
   *            1. "all", year str, month str, day str, hour str, minute str
   *            2. "full-time", year str, month str, day str, internal time str (hour and minutes delimited)
   *            3. "full-date", internal date str (year, month and day delimited), hour str, minute str
   *            4. "full-date-time", date str (year, month and day delimited), time str (hour and minutes delimited)
   */
  generateInternalDateTimeStr: function( arg /* typeArg, arg1, arg2, ...*/ )
  {
    // "all", year str, month str, day str, hour str, minute str
    if( arguments[0] == "all" )
    {
      return arguments[1] + calendar.DateTimePicker.Constants.INTERNAL_DATE_DELIMITER +
             arguments[2] + calendar.DateTimePicker.Constants.INTERNAL_DATE_DELIMITER +
             arguments[3] + calendar.DateTimePicker.Constants.INTERNAL_DATE_TIME_SPACER +
             arguments[4] + calendar.DateTimePicker.Constants.INTERNAL_TIME_DELIMITER +
             arguments[5] + calendar.DateTimePicker.Constants.INTERNAL_TIME_DELIMITER +
             "00";
    }
    // "full-time", year str, month str, day str, time str (hour and minutes delimited)
    else if( arguments[0] == "full-time" )
    {
      return arguments[1] + calendar.DateTimePicker.Constants.INTERNAL_DATE_DELIMITER +
             arguments[2] + calendar.DateTimePicker.Constants.INTERNAL_DATE_DELIMITER +
             arguments[3] + calendar.DateTimePicker.Constants.INTERNAL_DATE_TIME_SPACER +
             arguments[4];
    }
    // "full-date", date str (year, month and day delimited), hour str, minute str
    else if( arguments[0] == "full-date" )
    {
      return arguments[1] + calendar.DateTimePicker.Constants.INTERNAL_DATE_TIME_SPACER +
             arguments[2] + calendar.DateTimePicker.Constants.INTERNAL_TIME_DELIMITER +
             arguments[3] + calendar.DateTimePicker.Constants.INTERNAL_TIME_DELIMITER +
             "00";
    }
    // "full-date-time", date str (year, month and day delimited), time str (hour and minutes delimited)
    else if( arguments[0] == "full-date-time" )
    {
      return arguments[1] +
             calendar.DateTimePicker.Constants.INTERNAL_DATE_TIME_SPACER +
             arguments[2];
    }
  },

  /**
   * Return a string array with the first element being the date and the second, the time.
   * @param internalDateTimeStr
   */
  getInternalDateTimeStrArr: function( internalDateTimeStr )
  {
    return internalDateTimeStr.split( calendar.DateTimePicker.Constants.INTERNAL_DATE_TIME_SPACER );
  },

  /**
   * Return a Javascript Date object by parsing the internal date time string ("yyyy-MM-dd HH:mm:ss") passed.
   * If no arguments given, the current internal date time element value is used (this._baseElement.value).
   * If the string given is null or empty, null is returned. If isDateOnly forces the returned Date Object to
   * have 0 for hours, minutes, and seconds to prevent date-only pickers from comparing time.
   *
   * @param internalDateTimeStr
   * @param isDateOnly
   */
  getDateObjFromInternalDateTimeStr: function( internalDateTimeStr, isDateOnly )
  {
    // if no args, use the current internal datetime element value string
    if( !internalDateTimeStr )
    {
      internalDateTimeStr = this._baseElement.value;
    }

    if( internalDateTimeStr && internalDateTimeStr != "" )
    {
      var parts = internalDateTimeStr.match(/(\d\d\d\d)-(\d\d?)-(\d\d?)\s(\d\d?):(\d\d?):(\d\d?)/);
      if (isDateOnly )
      {
        return new Date( parseInt(parts[1],10), parseInt(parts[2],10)-1, parseInt(parts[3],10),
                         0, 0, 0 );
      }
      else
      {
        return new Date( parseInt(parts[1],10), parseInt(parts[2],10)-1, parseInt(parts[3],10),
                         parseInt(parts[4],10), parseInt(parts[5],10), parseInt(parts[6],10) );
      }
    }
    return null;
  },

  /**
   * Return int of hour converted from the 12 hr format to the 24 hr format.
   * For example, given the arguments "1" and "false", 13 will be returned.
   *
   * @param int12HrFormat hour integer or string in the 12 hr format (1-12)
   * @param isAM boolean indicating whether it is AM or PM
   */
  get12to24HrFormat: function( int12HrFormat, isAM )
  {
    var hour = parseInt(int12HrFormat,10);

    if( !isAM && hour != 12 )
    {
      // add 12 hrs to get to 24hr format unless it's 12PM
      hour = hour + 12;
    }
    if( isAM && hour == 12 )
    {
      hour = 0; // 12AM
    }

    return hour;
  },

  /**
   * Get the hour or minutes integer from the given time string.
   * The hour is not changed to be a 12hr or 24hr format.
   *
   * If the time string is not in the correct format, or if
   * the type passed is not "H" or "M", or if the validation is failed when
   * the parameter validate is set to true, then -1 is returned.
   *
   * @param timeStr "HH:MM" or "MM:HH"
   * @param type either "H" or "M"
   * @param validate validate the hours and minutes to see if they are valid integers; does not validate if the numbers are valid numbers to be hours or minutes
   */
  getHourOrMinutesInt: function( timeStr, type, validate )
  {
    // take out spaces
    timeStr = timeStr.strip().sub(" ", "");

    var hrsMinsArr = timeStr.split( calendar.DateTimePicker.Constants.TIME_DELIMITER );

    // there must be 2 items in the array, one containing the hour and the other minutes
    if( hrsMinsArr.length === 2 && ( type === "H" || type === "M" ) )
    {
      var hoursStr   = "";
      var minutesStr = "";

      var timeOrder = page.bundle.getString("LOCALE_SETTINGS.TIME_ORDER.00519"); //HMP, MHP, PHM
      if( timeOrder.indexOf("H") < timeOrder.indexOf("M") )
      {
        hoursStr   = hrsMinsArr[0];
        minutesStr = hrsMinsArr[1];
      }
      else
      {
        minutesStr = hrsMinsArr[0];
        hoursStr   = hrsMinsArr[1];
      }

      // validate if number strings are in number format
      if( validate )
      {
        var intRegex = /^\d+$/;
        if ( type === "H" ) 
        {
          if ( !intRegex.test( hoursStr ) )
          {
            return -1;
          }
        }
        else if ( type === "M" )
        {
          if ( !intRegex.test( minutesStr ) )
          {
            return -1;
          }
        }
      }
      
      var hoursInt = parseInt(hoursStr,10);
      var minutesInt = parseInt(minutesStr,10);

      if( !isNaN(hoursInt) && !isNaN(minutesInt) )
      {
        if( type === "H" )
        {
          return hoursInt;
        }
        else if( type === "M" )
        {
          return minutesInt;
        }
      }
      return -1;
    }

    return -1;
  },

  /**
   * Returns true or false on whether the date time range is valid.
   * The date time range is valid if the end date is greater than
   * (end date occurs after start date) or equal to the start date.
   * Validation is not needed for all cases, depending on whether
   * a combination of start and end checkboxes are checked. The following
   * are cases when validation is done on the start and end dates:
   *
   * CASES:
   * 1. both current and pair (start and end) checkboxes are there and checked
   * 2. neither current and pair checkboxes are there
   * 3. current does have checkbox and is checked but pair does not have checkbox
   * 4. current does not have checkbox but pair does have checkbox and is checked
   *
   * If validation is done and the range for the start and end date is not valid,
   * then the method will pop up an alert based on what is found invalid.
   *
   * The method will always true if validation is not necessary because
   * either the start or end checkbox is not checked or if the passed type
   * is an empty string.
   *
   * @param currentCheckboxElement the checkbox element to the current type (either start or end checkbox)
   * @param currentDateObj the Date object containing the current date time (either start or end Date obj)
   * @param pickerType Allowed values: calendar.DateTimePicker.Constants.DATE_TYPE or TIME_TYPE. Used to
   *          determine the error messages shown when validation fails.
   */
  isValidDateTimeRange : function( currentCheckboxElement, currentDateObj, pickerType )
  {
    // if is date range picker, the type will either be "start" or "end"
    if ( this.type == "" )
    {
      return true;
    }

    // if the current picker is the start, then the pair is the end, and vice versa.
    var pairCheckboxElement = this.pairCheckboxElement;

    var startDateObj = null;
    var endDateObj = null;

    if ( this.type == "start" )
    {
      startDateObj = currentDateObj;
      endDateObj = this.getDateObjFromInternalDateTimeStr( this.pairHiddenInternalDateTimeInputElement.value, pickerType == "date" );
    }
    else if ( this.type == "end" )
    {
      startDateObj = this.getDateObjFromInternalDateTimeStr( this.pairHiddenInternalDateTimeInputElement.value, pickerType == "date" );
      endDateObj = currentDateObj;
    }

    var toValidate = false;

    // CASE 1 - both start and end checkboxes are there
    if ( currentCheckboxElement && pairCheckboxElement )
    {
      // if both checkboxes are checked, validate
      if ( currentCheckboxElement.checked && pairCheckboxElement.checked )
      {
        toValidate = true;
      }
    }

    // CASE 2 - neither start and end checkboxes are there
    else if ( !currentCheckboxElement && !pairCheckboxElement )
    {
      toValidate = true;
    }

    // CASE 3 & 4 - only start|end checkbox is there, end|start does not have a checkbox
    else if ( ( !currentCheckboxElement && pairCheckboxElement ) ||
               ( currentCheckboxElement && !pairCheckboxElement ) )
    {
      // if current checkbox exists and is checked, validate
      // otherwise, if my pair checkbox exists and is checked, validate
      if ( ( currentCheckboxElement && currentCheckboxElement.checked ) ||
            ( pairCheckboxElement && pairCheckboxElement.checked ) )
      {
        toValidate = true;
      }
    }

    if ( !toValidate )
    {
      return true;
    }

    var startDateObjTime = startDateObj.getTime();
    var endDateObjTime = endDateObj.getTime();
    var dateRangeNotValidMsg = page.bundle.getString( 'datePicker.validation.invalid.range_past' );
    var timeRangeNotValidMsg = page.bundle.getString( 'timePicker.validation.invalid.range_past' );

    var invalidDatesAreEqualMsg;
    if ( pickerType == calendar.DateTimePicker.Constants.DATE_TYPE )
    {
      invalidDatesAreEqualMsg = page.bundle.getString( 'datePicker.validation.invalid.range_equal' );
    }
    else
    {
      invalidDatesAreEqualMsg = page.bundle.getString( 'timePicker.validation.invalid.range_equal' );
    }

    if ( endDateObjTime == startDateObjTime )
    {
      new page.NestedInlineConfirmation("warning", invalidDatesAreEqualMsg, false, $( this._errorDivId ), true, "", true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
      return false;
    }

    if ( startDateObj.getFullYear() < endDateObj.getFullYear() )
    {
      return true;
    }
    // if start date is later than end date, pop-up warning of dateRangeNotValidMsg
    // otherwise pop-up warning of timeRangeNotValidMsg
    else if ( startDateObj.getFullYear() > endDateObj.getFullYear() )
    {
      new page.NestedInlineConfirmation( "warning", dateRangeNotValidMsg, false, $( this._errorDivId ), true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
      return false;
    }

    if ( startDateObj.getMonth() < endDateObj.getMonth() )
    {
      return true;
    }
    else if ( startDateObj.getMonth() > endDateObj.getMonth() )
    {
      new page.NestedInlineConfirmation( "warning", dateRangeNotValidMsg, false, $( this._errorDivId ), true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
      return false;
    }

    if ( startDateObj.getDate() < endDateObj.getDate() )
    {
      return true;
    }
    else if ( startDateObj.getDate() > endDateObj.getDate() )
    {
      new page.NestedInlineConfirmation( "warning", dateRangeNotValidMsg, false, $( this._errorDivId ), true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
      return false;
    }

    if ( endDateObjTime < startDateObjTime )
    {
      new page.NestedInlineConfirmation( "warning", timeRangeNotValidMsg, false, $( this._errorDivId ), true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
      return false;
    }

    return true;
  },

  /**
   * Validate that if filter future date time is set to true, that the give Date object is not a date time in the future
   * of the current date time. If not valid, an alert will pop up. Returns true if valid and false otherwise.
   *
   * @param msgType
   *          Allowed values: calendar.DateTimePicker.Constants.DATE_TYPE or TIME_TYPE. The message types determine the
   *          error messages when validation fails.
   * @param userDateObj
   *          The Date object to check
   */
  validateFutureDateTime: function(msgType, userDateObj, isNavigation)
  {
    // check that the user's date isn't a time in the future if future date picking is not allowed
    if( !this._allowFutureDateTime )
    {
      if( this.isFutureDate( userDateObj ) )
      {
        var futureDatesNotAllowedMsg = "";
        if( msgType == calendar.DateTimePicker.Constants.DATE_TYPE )
        {
          futureDatesNotAllowedMsg = page.bundle.getString("datePicker.validation.invalid.futureYear");
        }
        else if( msgType == calendar.DateTimePicker.Constants.TIME_TYPE )
        {
          futureDatesNotAllowedMsg = page.bundle.getString("timePicker.validation.invalid.futureYear");
        }


        var errorSpan = isNavigation ? $( this._errorSpanOnPicker ) :  $( this._errorDivId );
        var errorDivId = isNavigation ? "datePickerErrorDivId" : this.calendarErrorDivId;
        new page.NestedInlineConfirmation( "warning", futureDatesNotAllowedMsg, false, errorSpan, true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, errorDivId );
        return false;
      }
    }
    return true;
  },

  /**
   * Returns true if the given Date object is a date in the future based on the current date.
   */
  isFutureDate: function( dateObj )
  {
    var today = this.getTodayInServerZone().getTime();
    var userDate = dateObj.getTime();

    if( userDate > today )
    {
      return true;
    }
    else
    {
      return false;
    }
  },

  /**
   * Returns true if the given Date object is a date in the past based on the current date.
   */
  isPastDate: function( dateObj )
  {
    var today = this.getTodayInServerZone().getTime();
    var userDate = dateObj.getTime();

    if( userDate < today )
    {
      return true;
    }
    else
    {
      return false;
    }
  },

  /**
   * Gets a date object built in the client's time zone into one using the server's time zone.
   * Note that this does not take an arbitrary date object because the server's time zone will
   * differ based on daylight savings rules.
   */
  getTodayInServerZone : function ()
  {
    var result = new Date();
    var clientTimeZoneOffset = result.getTimezoneOffset() * 60000 * -1;
    result.setTime( result.getTime() + this.serverTimeZoneOffset - clientTimeZoneOffset );
    return result;
  },

  /**
   * If externalValidateJsCallback attribute is defined in the picker tag,
   * then return the result of user defined external validation callback function.
   * Else return true.
   */
  runExternalValidation: function( userDateObj, pickerType )
  {
    if ( this.externalValidateJsCallback && this.externalValidateJsCallback != "null" )
    {
      return this.externalValidateJsCallback( this, pickerType, userDateObj );
    }
    else
    {
      return true;
    }
  },

  /**
   * If pair input text element is empty, set it to the date object given.
   *
   * For example, if the given type is DATE_TYPE, it checks if it has a time picker,
   * then, if the time picker input box is empty, it populates it with the
   * time in the date object.
   *
   * This method is meant to be opposite to the setEmpty method.
   * Since setEmpty empties out the date input box if time input box is emptied and
   * time input box if date input box is emptied, this method serves to do the opposite:
   * populate the date input box (if empty) if time input box is populated and
   * time input box (if empty) if date input box is populated.
   *
   * The reason for this is that we always want both date and time or none at all if
   * both date and time are showing.
   *
   * @param event
   * @param type    Required. Allowed values: calendar.DateTimePicker.Constants.DATE_TYPE or TIME_TYPE.
   * @param dateObj The Date object to set
   */
  updateIfEmptyPairInputTextElement: function( event, type, dateObj )
  {
    // if pair input text element exists, then update
    if( this.pairInputTextElement && this.pairInputTextElement.value=="" )
    {
      var pickerArr = calendar.TimePicker.timePickers;
      if( type == calendar.DateTimePicker.Constants.DATE_TYPE )
      {
        pickerArr = calendar.TimePicker.timePickers;
      }
      else if( type == calendar.DateTimePicker.Constants.TIME_TYPE )
      {
        pickerArr = calendar.DatePicker.datePickers;
      }

      if( pickerArr.length > 0 )
      {
        for ( var index = 0; index < pickerArr.length; index++ )
        {
          var item = pickerArr[index];
          if( this.pairInputTextElement == item.inputTextElement )
          {
            item.setInputsAndValues( dateObj, false );
            break;
          }
        }
      }
    }
  },

  /**
   * Set the value for the checkbox form element for a date range picker checkbox
   *
   * If the date or time input text boxes are empty when checkbox is being checked,
   * this method populates them with the current datetime.
   */
  setCheckboxValue: function(event)
  {
    if (this.checkboxType.checked)
    {
      this.checkboxType.value = page.bundle.getString("datepicker_checkbox_checked_value");
      this._allowEmpty = "false";

      // if date box is empty, that means time box is empty too, so populate the date and time boxes
      // with values because date and time boxes cannot be empty when checkbox is checked
      if( this.inputTextElement.value == "" )
      {
        var dateObjToSet = new Date();

        /* Determine what to set the date time to depending on if it's a date range picker
         * and it has a pair (start or end) datetime.
         *
         * If pair checkbox exists and is checked:
         *    -If this is the START datetime, set to a day and 1hr earlier than pair
         *    -If this is the END  datetime, try to set to a day and 1hr later than pair
         *       - If future datetime isn't allowed and datetime we're trying to set
         *         is a future datetime, just set to default current datetime.
         *
         */
        if( this.pairCheckboxElement && this.pairCheckboxElement.checked )
        {
          var pairDateObj = this.getDateObjFromInternalDateTimeStr( this.pairHiddenInternalDateTimeInputElement.value );

          var oneDayInMilliseconds  = (24*60*60*1000);
          var oneHourInMilliseconds = (60*60*1000);
          var timeIncrementMS = oneDayInMilliseconds+oneHourInMilliseconds;

          if( this.type == "start" )
          {
            dateObjToSet.setTime( pairDateObj.getTime() - timeIncrementMS );
          }
          else if ( this.type == "end" )
          {
            var tempDateObj = new Date();
            tempDateObj.setTime(pairDateObj.getTime() + timeIncrementMS);

            // if allow future datetime OR not allow future datetime and date isn't future, set to incremented date and time
            // else if not allow future datetime and date we're about to set is future, dateObjToSet remains at current datetime
            if( this._allowFutureDateTime ||  !this.isFutureDate(tempDateObj) )
            {
              dateObjToSet.setTime( tempDateObj.getTime() );
            }
          }
        }

        if( this instanceof calendar.DatePicker )
        {
          // this is for the following cases: 1. showing date picker only 2. showing date picker and time picker together
          // call validateDate() to set the date box, then call updateIfEmptyPairInputTextElement() to set the time box if exists
          dateObjToSet.setHours( 23, 59, 0, 0 );
          this.setInputsAndValues( dateObjToSet, false );
          this.updateIfEmptyPairInputTextElement( event, calendar.DateTimePicker.Constants.DATE_TYPE, dateObjToSet );
        }
        else if( this instanceof calendar.TimePicker )
        {
          // this is for the following case: 1. showing time picker only
          this.setInputsAndValues( dateObjToSet, false );
        }
      }
    }
    else
    {
      this.checkboxType.value = '';
      this._allowEmpty = "true";
    }
  },
  
  /*
   * Check the checkbox element that is linked to the date/time picker if it is not already checked and if 
   * the input date/time format validation passes.
   * 
   * Note : We are validating the user input if it is in the right format, but we do not do the entire validation
   * at this point because the validation routine that is run at the form submit can only be successfully run if all
   * the date/time elements in the picker have been filled out by the user because. For example the validation run
   * at form submit also validates dependencies between date/time elements for date/time range to see if the date/time
   * range makes sense.
   * 
   * userInput : if the date/time value was directly keyed in by the user not using the calendar/time popup
   */
  onCalendarDateTimeChange : function ( event, userInput )
  {
    if ( this.inputTextElement )
    {
      this.inputTextElement.value = this.inputTextElement.value.trim();
    }
    
    if ( this.inputTextElement && this.inputTextElement.value !== "" )
    {
      event = event || window.event;
      
      var isDate = calendar.DateTimePicker.isDatePicker ( this );
      
      // validate user input
      var isValidDateTimeInput = false;
      if( userInput )
      {
        if( isDate )
        {
          isValidDateTimeInput = calendar.DateTimePicker.getCurrentDateTime( this, null );
        }
        else
        {
          isValidDateTimeInput = calendar.DateTimePicker.getCurrentDateTime( null, this );
        }
      }
      else
      {
        isValidDateTimeInput = true;
      }
      
      // check checkbox if it is not already checked and if the date/time format validation passed above
      if( isValidDateTimeInput )
      {
        if( this.checkboxType && this.checkboxType.disabled === false && this.checkboxType.checked === false )
        {
          this.checkboxType.value = "1";
          this.checkboxType.checked = true;

          var dateObjToSet = new Date();
          dateObjToSet.setHours( 23, 59, 0, 0 );
          //this populates time input box (if empty) if date input box is populated
          this.updateIfEmptyPairInputTextElement( event, calendar.DateTimePicker.Constants.DATE_TYPE, dateObjToSet );
        }
        
        // Fire a custom event indicating that the date/time has changed
        this.inputTextElement.fire( 'calendar-time:changed', { type : calendar.DateTimePicker.isDatePicker( this ) ? 'date' : 'time', picker : this } );
      }
      else
      {
        if( isDate )
        {
          // date format not valid, reset to previous value and stop everything
          new page.NestedInlineConfirmation( "warning", page.bundle.getString( "datePicker.validation.invalid.date" ), false, $( this._errorDivId ), true, false/*extract css*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId, null );
          this.setInputsAndValues( this.getDateObjFromInternalDateTimeStr(), false );
          return this._validateDateError( event );
        }
        else
        {
          // time format not valid, reset to previous value and stop everything
          new page.NestedInlineConfirmation( "warning", page.bundle.getString( "timePicker.validation.invalid.time" ), false, $( this._errorDivId ), true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId, null);
          this.setInputsAndValues( this.getDateObjFromInternalDateTimeStr(), false );
          return this._validateTimeError( event );
        }
        
      }
    }
  }
};

/*
 * Returns true if the dateTimePicker passed in is a date picker type; returns false if not
 */
calendar.DateTimePicker.isDatePicker = function ( dateTimePicker )
{
  if( dateTimePicker.inputTextElement.id.substring( 0, 3 ) === calendar.DateTimePicker.Constants.TYPE_DATE_PICKER )
  {
    return true;
  }
  return false;
}
  
/**
 * Utility function that will retrieve the current time that the user has chosen based
 * on what is entered in the text boxes.
 *
 * This function will return null if either the date picker or time picker is in an
 * invalid format.
 *
 * @param datePicker the date picker object to get the date part from
 * @param timePicker the time picker object to get the time part from
 */
calendar.DateTimePicker.getCurrentDateTime = function( datePicker, timePicker )
{
  var result = null;
  if ( datePicker )
  {
    result = datePicker._getDateValueFromString( datePicker.getDateObjFromInternalDateTimeStr(), datePicker.inputTextElement.value );
    if ( result == null )
    {
      return null;
    }
  }
  if ( timePicker )
  {
    if ( datePicker && null === result )
    {
      // if both datePicker and timePicker were passed in to the method and we have not obtained a proper date value from the datePicker, we must stop here and return null
      return result;
    }
    result = timePicker._getTimeValueFromString( datePicker ? result : timePicker.getDateObjFromInternalDateTimeStr(), timePicker.inputTextElement.value );
  }
  return result;
};

calendar.getDynamicDivId = function ( baseName )
{
  var newDivId = baseName + (calendar.NestedInlineConfirmationIdCounter++);
  return newDivId;
};
// --------------------------------------------- Date Picker ---------------------------------------------
calendar.NestedInlineConfirmationIdCounter = 0;
calendar.DatePicker = Class.create();
calendar.DatePicker._daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
calendar.DatePicker.dayNameSuffixes = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
calendar.DatePicker.monthNameSuffixes = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
calendar.DatePicker.dates = [];
calendar.DatePicker.todayStr = undefined;
calendar.DatePicker.timeZoneOffset= undefined;
Object.extend(calendar.DatePicker.prototype, calendar.DateTimePicker.prototype);
Object.extend(calendar.DatePicker.prototype,
{
    /**
     * An encapsulation of the Date picker widget
     *
     * @param baseElement      String value for the base picker name.
     * @param dateValue        Internal datetime string for the initial date.
     * @param type             String values "start" or "end" (for the date range picker case).
     *                         May be empty string.
     * @param basePairElement  String value for the 2nd picker name (for the date range picker case).
     *                         May be empty string.
     * @param allowEmpty       Boolean string for whether input boxes for the picker may be empty.
     * @param filterFutureYear Boolean string for whether future dates should be BLOCKED from selection.
     * @param todayStr         Localized string announcing today's date "Today is Friday February 15, 2008"
     * @param viewOnly         Boolean string for whether the picker should be in view-only mode or not
     * @param externalValidateJsCallback   (optional) Function handle of external validation JavaScript callback
     * @param timeZoneOffset   Server timezone offset from UTC in milliseconds
     * @param checkBoxFieldId  Check box field Id to be assosiated with the date picker for decision on the
     *                         selection of the date picker. If available then it need to be checked for
     *                         value to consider. If not available then not-null values for date and time
     *                         text boxes get considered.
     */
    initialize: function( baseElement, dateValue, type, basePairElement, allowEmpty, filterFutureYear, todayStr, viewOnly, externalValidateJsCallback, timeZoneOffset, checkBoxFieldId )
    {
      // id element for textbox , name = baseElement + '_' + this.type + '_date';
      var dpTextElement = "";
      var tpTextElement = "";
      var dpElement = "";
      if (type != "")
      {
        dpTextElement = calendar.DateTimePicker.Constants.TYPE_DATE_PICKER + baseElement + '_' + type + '_date';
        tpTextElement = calendar.DateTimePicker.Constants.TYPE_TIME_PICKER + baseElement + '_' + type + '_time';

        // datePicker div  Element
        dpElement = "d_" + baseElement + '_' + type + '_date';
      }
      else
      {
        dpTextElement = calendar.DateTimePicker.Constants.TYPE_DATE_PICKER + baseElement + '_date';
        tpTextElement = calendar.DateTimePicker.Constants.TYPE_TIME_PICKER + baseElement + '_time';

        dpElement = "d_" + baseElement + '_date';
      }
     
      // Not sure why we pass this string into every date picker, but for user test options we're dynamically
      // adding datepickers to the page and I don't see a reason to go figure out an appropriate today-is string
      // in test code - just going to pass in null and rely on the fact that there is already another date picker on the page
      // that will have set the label for us.
      if (todayStr)
      {
        calendar.DatePicker.todayStr = todayStr;
      }
      else
      {
        todayStr = calendar.DatePicker.todayStr;
      }
      // ditto to todayStr but for timeZoneOffset
      if (timeZoneOffset)
      {
        calendar.DatePicker.timeZoneOffset= timeZoneOffset;
      }
      else
      {
        timeZoneOffset = calendar.DatePicker.timeZoneOffset;
      }

      calendar.DateTimePicker.prototype.initialize.call( this, dpElement, baseElement, basePairElement, type,
                                                         dpTextElement, tpTextElement, allowEmpty, filterFutureYear,
                                                         externalValidateJsCallback, timeZoneOffset, checkBoxFieldId );

      this.months = [];
      this.fullMonths = [];
      this.days = [];
      this.fullDays = [];
      this.initMonthDays(); // based in locale strings
      this.getFirstWeekDay(); // based on locale now
      this.enabled = true;
      this.calendarErrorDivId = calendar.getDynamicDivId('calendar_nested_error');

      this._matrix = [[],[],[],[],[],[],[]];
      var localeDates = page.bundle.getString('LOCALE_SETTINGS.DAYS.00521');

      var arrDate = [];
      arrDate = localeDates.split(" ");
      for (var x = 0; x < arrDate.length; x++)
      {
          calendar.DatePicker.dates[x] = arrDate[x];
      }

      this.setInputsAndValues( (dateValue == "") ?
                               null :
                               this.getDateObjFromInternalDateTimeStr(dateValue), true );

      // Image Element
      var dpImageElement = 'datePicker' + this.type + '_' + baseElement;
      this.dpImageLink = $(dpImageElement);

      var doc = document;

      // the close pop up link
      var aLink = doc.createElement("a");
      aLink.href = "#";
      aLink.className = "contextmenubar";
      this.aLinkImage = doc.createElement("img");
      this.aLinkImage.src = "/images/ci/ng/close_mini.gif";
      this.aLinkImage.setAttribute("title", page.bundle.getString('datePicker.close'));
      this.aLinkImage.setAttribute("alt", page.bundle.getString('datePicker.close'));
      aLink.appendChild(this.aLinkImage);

      // creating the date picker popup html
      if ( this.popupElement )
      {
        calendar.DatePicker.registerDatePicker(this);
        this.popupElement.appendChild(aLink);

        var divHeader = doc.createElement("div");
        divHeader.className = "calHead";
        this.popupElement.appendChild(divHeader);

        // month year text area
        this._topLabel = doc.createElement("h3");
        this._topLabel.setAttribute("aria-live","assertive");
        this._topLabel.setAttribute("aria-relevant","additions text");
        this._topLabel.appendChild(doc.createTextNode(String.fromCharCode(160)));
        divHeader.appendChild(this._topLabel);

        var dPrev = doc.createElement("div");
        dPrev.className = "previous";
        divHeader.appendChild(dPrev);

        this._previousYear = doc.createElement("a");
        this._previousYear.href = "#";
        this._previousYearImg = doc.createElement("img");
        this._previousYearImg.src = "/images/ci/ng/cm_arrow_left_end.gif";
        this._previousYearImg.title = page.bundle.getString('picker.alt.previous_year');
        this._previousYearImg.alt = page.bundle.getString('picker.alt.previous_year');
        this._previousYear.appendChild(this._previousYearImg);
        dPrev.appendChild(this._previousYear);

        this._previousMonth = doc.createElement("a");
        this._previousMonth.href = "#";
        this._previousMonthImg = doc.createElement("img");
        this._previousMonthImg.src = "/images/ci/ng/cm_arrow_left.gif";
        this._previousMonthImg.title = page.bundle.getString('picker.alt.previous_month');
        this._previousMonthImg.alt = page.bundle.getString('picker.alt.previous_month');
        this._previousMonth.appendChild(this._previousMonthImg);
        dPrev.appendChild(this._previousMonth);

        var dNext = doc.createElement("div");
        dNext.className = "next";
        divHeader.appendChild(dNext);

        this._nextMonth = doc.createElement("a");
        this._nextMonth.href = "#";
        this._nextMonthImg = doc.createElement("img");
        this._nextMonthImg.src = "/images/ci/ng/cm_arrow_right.gif";
        this._nextMonthImg.title = page.bundle.getString('picker.alt.next_month');
        this._nextMonthImg.alt = page.bundle.getString('picker.alt.next_month');
        this._nextMonth.appendChild(this._nextMonthImg);
        dNext.appendChild(this._nextMonth);

        this._nextYear = doc.createElement("a");
        this._nextYear.href = "#";
        this._nextYearImg = doc.createElement("img");
        this._nextYearImg.src = "/images/ci/ng/cm_arrow_right_end.gif";
        this._nextYearImg.title = page.bundle.getString('picker.alt.next_year');
        this._nextYearImg.alt = page.bundle.getString('picker.alt.next_year');
        this._nextYear.appendChild(this._nextYearImg);
        dNext.appendChild(this._nextYear);

        //add error span
        this._errorSpanOnPicker = doc.createElement("span");
        this._errorSpanOnPicker.className = "dateTimeErrorDiv";
        this.popupElement.appendChild(this._errorSpanOnPicker)

        var div = doc.createElement("div");
        div.className = "calWrapper";
        this.popupElement.appendChild(div);
        this._table = $(div);
        var divFooter = doc.createElement("div");
        divFooter.className = "calFoot";
        this._today = doc.createElement("a");
        this._today.appendChild(doc.createTextNode(String.fromCharCode(160)));
        divFooter.appendChild(this._today);
        this.popupElement.appendChild(divFooter);

        this.createTable(doc);
        this.updateTable(1);
        this.setMonthYearLabel();
        this.setTodayLabel( todayStr );
      }

      if (viewOnly != "true") {
        Event.observe( this.popupElement, 'keydown', this.onKeyPress.bindAsEventListener( this ) );
      }

      Event.observe(document.body, "click", calendar.DatePicker.closeAllDatePickers);

      if ( this.checkboxType )
      {
        Event.observe(this.checkboxType, 'click', this.setCheckboxValue.bindAsEventListener(this));
      }

      if ( this.dpImageLink )
      {
        if (viewOnly == "true")
        {
          Event.observe(this.dpImageLink, 'click', this.doNothing.bindAsEventListener(this));
        }
        else
        {
          Event.observe(this.dpImageLink, 'click', this.showPicker.bindAsEventListener(this));
        }
      }

      if ( this._previousMonth )
      {
        Event.observe(this._previousMonth, 'click', this.goToPreviousMonth.bindAsEventListener(this));
      }

      if ( this._nextMonth )
      {
        Event.observe(this._nextMonth, 'click', this.goToNextMonth.bindAsEventListener(this));
      }

      if ( this._previousYear )
      {
        Event.observe(this._previousYear, 'click', this.goToPreviousYear.bindAsEventListener(this));
      }

      if ( this._nextYear )
      {
        Event.observe(this._nextYear, 'click', this.goToNextYear.bindAsEventListener(this));
      }

      if ( this.aLinkImage )
      {
        Event.observe(this.aLinkImage, 'click', this.hidePicker.bindAsEventListener(this));
      }

      if ( this._table )
      {
        Event.observe(this._table, 'click', this.saveDate.bindAsEventListener(this));
      }

      // relocate the context menu div to the bottom of the page so that its CSS won't get messed up by parent tags -- JimR
      Element.remove(this.popupElement);
      document.body.appendChild(this.popupElement);
    },

    onKeyPress: function( event )
    {
      var key = event.keyCode || event.which;
      if ( key == Event.KEY_ESC )
      {
        this.hidePicker(event);
      }
    },


    /**
     * Set date from the date picker and validate
     */
    saveDate: function (event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      var el = Event.findElement(event, "td");
      if ( !el || !el.childNodes[0].firstChild )
      {
        return;
      }
      var d = this.copyDate( this._selectedDate );
      var n = Number(el.childNodes[0].firstChild.data);

      if ( isNaN(n) || n <= 0 || !n )
      {
        return;
      }
      d.setDate(n);

      //remove any error messages from before on successful date picking
      if($("datePickerErrorDivId"))
      {
        Element.remove($("datePickerErrorDivId"));
      }
      this.hidePicker(event);
      this.setInputsAndValues( d, false );

      this.onCalendarDateTimeChange( event, false );
    },

    /**
     * Set a Date object to this._selectedDate and update the date picker popup table.
     *
     * @param dateObj the Date object to set the date
     */
    setSelectedDate: function (dateObj)
    {
      if( !this._selectedDate ||
          ( this._selectedDate && !dateObj ) ||
          (
            this._selectedDate.getDate() != dateObj.getDate() ||
            this._selectedDate.getMonth() != dateObj.getMonth() ||
            this._selectedDate.getFullYear() != dateObj.getFullYear()
          )
        )
      {
        this._selectedDate = (dateObj === null) ? null : this.copyDate(dateObj);
        this.setMonthYearLabel();
        this.updateTable(0);
      }
    },

    copyDate: function ( dateObj )
    {
      var copyOfDate = null;
      if ( dateObj )
      {
        copyOfDate =  new Date( dateObj.getFullYear(), dateObj.getMonth(),
        dateObj.getDate(), dateObj.getHours(),
        dateObj.getMinutes(), dateObj.getSeconds() );
      }
      else
      {
        copyOfDate = new Date();
      }
      return copyOfDate;
    },

    /**
     * Sets the date in _selectedDate in localized string format to the date input box (this.inputTextElement)
     */
    setSelectedDateToTextBox: function ( initial )
    {
      var localizedDateStr = "";

      if( this._selectedDate )
      {
        localizedDateStr = page.bundle.getString("LOCALE_SETTINGS.internal_date_format");
        localizedDateStr = localizedDateStr.toUpperCase();
        localizedDateStr = localizedDateStr.replace(/MM/, ( this._selectedDate.getMonth() + 1 ).toPaddedString(2) );
        localizedDateStr = localizedDateStr.replace(/DD/, ( this._selectedDate.getDate() ).toPaddedString(2) );
        localizedDateStr = localizedDateStr.replace(/YY/, this._selectedDate.getFullYear() );
      }

      if (this.inputTextElement )
      {
        if ( window.widget && !initial )
        {
          widget.ShowUnsavedChanges.changeHiddenValue( this.inputTextElement, localizedDateStr );
        }
        else
        {
          (this.inputTextElement).value = localizedDateStr;
          this.inputTextElement.defaultValue = localizedDateStr;
          // TODO - change validation framework to use standard DOM defaultValue attribute
          this.inputTextElement._defaultValue = localizedDateStr;
        }
      }
    },

    /**
     * Set the value of the hidden HTML datetime input (this._baseElement) based on
     * its current values and values in this._selectedDate in the
     * internal date time format ("2008-2-11 13:58:00")
     */
    setHiddenDate: function ()
    {
      if ( this._baseElement )
      {
        if( this._selectedDate )
        {
          var currInternalDateTimeStr = this._baseElement.value;
          var newInternalDateTimeStr = currInternalDateTimeStr;

          var splitDateTime = this.getInternalDateTimeStrArr(currInternalDateTimeStr);
          var internalTimeStr = "";

          if ( splitDateTime[1] )
          {
              internalTimeStr = splitDateTime[1];
          }

          // get the new internal date time string based on current values in this._selectedDate
          if( internalTimeStr == "" )
          {
            newInternalDateTimeStr = this.generateInternalDateTimeStr( "all",
                                                                       this._selectedDate.getFullYear(),
                                                                       (this._selectedDate.getMonth() + 1),
                                                                       this._selectedDate.getDate(),
                                                                       this._selectedDate.getHours(),
                                                                       this._selectedDate.getMinutes() );
          }
          else
          {
            newInternalDateTimeStr = this.generateInternalDateTimeStr( "full-time",
                                                                       this._selectedDate.getFullYear(),
                                                                       (this._selectedDate.getMonth() + 1),
                                                                       this._selectedDate.getDate(),
                                                                       internalTimeStr );
          }

          // set the new internal date time string to the hidden HTML input
          this.setInternalDateTimeElementValue( newInternalDateTimeStr );
        }
        else
        {
          this.setEmpty();
        }
      }
    },

    /**
    * Converts the user-entered date field into a Date object
    */
    _getDateValueFromString : function( prevDateTimeObj, userDateStr )
    {
      // the format of the string we're expecting
      var localizedDateStrFormat = page.bundle.getString( "LOCALE_SETTINGS.internal_date_format" );
      localizedDateStrFormat = localizedDateStrFormat.toUpperCase();
      var monthIndex = ( localizedDateStrFormat.indexOf( "M" ) / 3 ) + 1;
      var dayIndex = ( localizedDateStrFormat.indexOf( "D" ) / 3 ) + 1;
      var yearIndex = ( localizedDateStrFormat.indexOf( "Y" ) / 3 ) + 1;

      // form regex based on the localized date string format
      var dateFormatRegex = localizedDateStrFormat;
      dateFormatRegex = dateFormatRegex.replace( /MM/, "([1-9]|0[1-9]|1[012])" );
      dateFormatRegex = dateFormatRegex.replace( /DD/, "([1-9]|0[1-9]|[12][0-9]|3[01])" );
      dateFormatRegex = dateFormatRegex.replace( /YY/, "([0-9][0-9][0-9][0-9])" );
      dateFormatRegex = "^" + dateFormatRegex + "$";

      var datePattern = new RegExp( dateFormatRegex );
      var result = datePattern.exec( userDateStr );
      if ( !result )
      {
        return null;
      }

      var userMonth = result[ monthIndex ] - 1; // set to Date obj value: 0-11
      var userDay = result[ dayIndex ];
      var userYear = result[ yearIndex ];

      // checking for invalid day set to a month, for example "2/31/2000"
      var userDateObj = new Date( userYear, userMonth, userDay, 12, 0, 0 );
      if ( userMonth == userDateObj.getMonth() && userDay == userDateObj.getDate() && userYear == userDateObj.getFullYear() )
      {
        // set the time to complete the obj (time is unchangable via the date input box, get it from the internal date time)
        userDateObj.setHours( prevDateTimeObj ? prevDateTimeObj.getHours() : 0 );
        userDateObj.setMinutes( prevDateTimeObj ? prevDateTimeObj.getMinutes() : 0 );
        return userDateObj;
      }

      return null;
    },

    _validateDateError : function( event )
    {
      this.inputTextElement.focus();
      if ( event )
      {
        Event.stop( event );
      }
      return false;
    },

    /**
     * Validate the date string of the user's input into the date input box or
     * a given Date object.
     *
     * This method validates the format of the date string entered (if Date object not
     * given), the semantics of the date (eg. no 2/31/2000), whether a future date is
     * picked but not allowed, and the range of the dates (if in a range picker).
     *
     * If not valid, the previous date that was there is set to the various picker attributes
     * and an error alert is displayed.
     *
     * @param dateObjToValidate Optional argument of a Date object to validate.
     *                          If argument not provided, method will use the value in the date input text box.
     */
    validateDate : function( event, dateObjToValidate )
    {
      // skip validation if checkbox exists and is not checked
      if ( this.checkboxType && !this.checkboxType.checked )
      {
        return true;
      }

      if ( this.skipValidation )
      {
        return true;
      }

      // previous date time string in internal format
      var prevDateTimeObj = this.getDateObjFromInternalDateTimeStr();

      var userDateObj;
      if ( dateObjToValidate && ( typeof dateObjToValidate == 'object' ) && dateObjToValidate.getTime )
      {
        // if date object parameter passed in, no need to check date format
        userDateObj = dateObjToValidate;
      }
      else
      {
        // validate the localized date string the user entered
        var userDateStr = this.inputTextElement.value;

        // set empty only if empty is allowed and checkbox (if exists) is NOT checked
        if ( this._allowEmpty == "true" && !userDateStr &&
             ( this.checkboxType ? !this.checkboxType.checked : true ) )
        {
          this.setEmpty();
          return true;
        }

        userDateObj = this._getDateValueFromString( prevDateTimeObj, userDateStr );
      }

      if ( !userDateObj )
      {
        // invalid format
        new page.NestedInlineConfirmation( "warning", page.bundle.getString( "datePicker.validation.invalid.date" ), false, $( this._errorDivId ), true, false/*extract css*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
        this.setInputsAndValues( prevDateTimeObj, false );
        return this._validateDateError( event );
      }

      // validate is not future date if future date is not allowed - method will pop its own alert if not valid
      if ( ! this.validateFutureDateTime( calendar.DateTimePicker.Constants.DATE_TYPE, userDateObj ) )
      {
        this.setInputsAndValues( prevDateTimeObj, false );
        return this._validateDateError( event );
      }

      // the date format is good and the date entered is valid, set inputs
      this.setInputsAndValues( userDateObj, false );

      // if this is the END pair of a START/END date/time range picker,
      // and the time portion is not also shown, then validate the range;
      // otherwise, range validation is not done on the start date, and
      // if the time portion is shown, let range validation be done at
      // the END time picker (when all the hidden datetime inputs are set)
      if ( this.type == "end" && !this.pairInputTextElement )
      {
        // now validate the range - the range validate method will pop its own alerts if not valid
        if ( this.isValidDateTimeRange( this.checkboxType,
                                        this.getDateObjFromInternalDateTimeStr( "", calendar.DateTimePicker.Constants.DATE_TYPE == "date" ),
                                        calendar.DateTimePicker.Constants.DATE_TYPE ) )
        {
          // if time input box is empty, set to the time in userDateObj
          this.updateIfEmptyPairInputTextElement( event, calendar.DateTimePicker.Constants.DATE_TYPE, userDateObj );
        }
        else
        {
          return this._validateDateError( event );
        }
      }

      if ( ! this.runExternalValidation( userDateObj, 'datePicker' ) )
      {
        return this._validateDateError( event );
      }

      return true;
    },

    /**
     * Sets the given Date object to internal date attributes this._selectedDate and this._baseElement and
     * update the user input text box w/ the date.
     */
    setInputsAndValues: function( dateObj, initial )
    {
      this.setSelectedDate( dateObj );
      this.setHiddenDate();
      this.setSelectedDateToTextBox( initial );
    },

    createTable: function (doc)
    {
      var i;
      var rows = 6;
      var cols = 7;
      var currentWeek = 0;

      var table = doc.createElement("table");
      table.className="pickerMonth";
      table.setAttribute("cellspacing", "0");
      table.setAttribute("summary", page.bundle.getString( "datePicker.date.select" ) );
      table.setAttribute("title", page.bundle.getString( "datePicker.date.select" ));

      var tHead = doc.createElement("thead");
      table.appendChild(tHead);

      var tBody = doc.createElement("tbody");
      table.appendChild(tBody);

      var tr = doc.createElement("tr");

      var td, th;
      var nbsp = String.fromCharCode(160);

      for (i = 0; i < cols; i++)
      {
        th = doc.createElement("th");// for days in a week
        th.setAttribute("scope", "col");
        th.setAttribute("title", (i+1));
        th.appendChild(doc.createTextNode(nbsp));
        tr.appendChild(th);
      }
      tHead.appendChild(tr);

      for (i = 0; i < rows; i++)
      {
        tr = doc.createElement("tr");// for the actual dates in a month
        for (var j = 0; j < cols; j++)
        {
          td = doc.createElement("td");
          var se = doc.createElement("a");
          se.href = "#";
          se.appendChild(doc.createTextNode(nbsp)); //blank cells created
          td.appendChild(se);
          tr.appendChild(td);
        }
        tBody.appendChild(tr);
      }


      if ( this._table )
      {
        this._table.appendChild(table);
      }
    },


    /**
     * Populate the date pop up table with numbers for days of the month
     *
     * @param selection
     */
    updateTable: function (selection)
    {
      if ( !this._table )
      {
        return;
      }

      var i;
      var str = "";
      var rows = 6;
      var cols = 7;
      var currentWeek = 0;
      var cells = new Array(rows);
      this._matrix = new Array(rows);

      for (i = 0; i < rows; i++)
      {
          cells[i] = new Array(cols);
          this._matrix[i] = new Array(cols);
      }

      var currSelectedDate = !this._selectedDate ? new Date() :  this._selectedDate;
      var tmpDate = new Date( currSelectedDate.getFullYear(), currSelectedDate.getMonth(), 1, 12, 0, 0 );

      // loop to calculate the grid values depending on the days in a month and firstWeekDay
      // evey cell has 2 properties: text and className
      for (i = 1; i < 32; i++)
      {
          //locale bases dates
          tmpDate.setDate(calendar.DatePicker.dates[i - 1]);
          var weekDay = (tmpDate.getDay() + 7) % 7;
          var colIndex = (weekDay - this._firstWeekDay + 7) % 7;

          if (tmpDate.getMonth() == currSelectedDate.getMonth())
          {

              cells[currentWeek][colIndex] = {text: "",className: ""};

              if (currSelectedDate.getDate() == tmpDate.getDate() && selection != "0")
              {
                cells[currentWeek][colIndex].className = "today";
              }

              cells[currentWeek][colIndex].text = this._matrix[currentWeek][colIndex] = calendar.DatePicker.dates[i - 1];

              if (colIndex == 6)
              {
                currentWeek++;
              }
          }
      }

      // loop to initialize the week days
      var weekDays = this.days;
      if (this._firstWeekDay !== 0)
      {
          weekDays = new Array(7);

          for (i = 0; i < 7; i++)
          {
              weekDays[i] = this.days[(i + this._firstWeekDay) % 7];
          }
      }

      var ths = this._table.down('thead').down().childElements();
      // loop to write the dates in a month into the dom elements
      for (i = 0; i < cols; i++)
      {
          ths[i].firstChild.data = weekDays[i];
      }
      // obtain the date elements
      var trs = this._table.down('tbody').childElements();
      var tmpCell;

      for (var y = 0; y < rows; y++)
      {
          for (var x = 0; x < cols; x++)
          {
              tmpCell = trs[y].childNodes[x];

              if (typeof cells[y][x] != "undefined")
              {
                  tmpCell.className = cells[y][x].className;
                  tmpCell.childNodes[0].firstChild.data = cells[y][x].text;
                  if (tmpCell.className == "today")
                  {
                    this.selectedCell = $(tmpCell);
                  }
              }
              else
              {
                  tmpCell.className = "offday";
              }
          }
      }
      
      if(trs[5].firstChild.hasClassName('offday')){
        trs[5].hide();
      }
      else
      {
        trs[5].show();
      }
    },

    /**
     * Set the localized header label on the date picker pop-up based on date in (this._selectedDate).
     * If the this._selectedDate is null, it then uses the current date time.
     */
    setMonthYearLabel: function ()
    {
      var dateObj = !this._selectedDate ? new Date() : this._selectedDate;

      // The order of month/year is based on locale
      var str = this.dispDate( dateObj, 'month_year' );
      if ( this._topLabel )
      {
        this._topLabel.lastChild.data = str;
      }
    },

    /**
     * Set the localized footer label on the date picker pop-up
     */
    setTodayLabel: function ( todayStr )
    {
      this._today.lastChild.data = todayStr;
    },

    // ---------------- Event Listeners for next and previous buttons

    goToNextMonth: function (event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      var d = new Date(this._selectedDate);
      d.setDate(Math.min(d.getDate(), this.getDaysPerMonth(d.getMonth() + 1, d.getFullYear())));
      d.setMonth(d.getMonth() + 1);

      if( !this.validateFutureDateTime(calendar.DateTimePicker.Constants.DATE_TYPE, d, true/*called from navigation*/) )
      {
        return;
      }

      this.setSelectedDate(d);
    },

    goToPreviousMonth: function (event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      var d = new Date(this._selectedDate);
      d.setDate(Math.min(d.getDate(), this.getDaysPerMonth(d.getMonth() - 1, d.getFullYear())));
      d.setMonth(d.getMonth() - 1);
      this.setSelectedDate(d);
    },

    goToNextYear: function (event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      var d = new Date(this._selectedDate);
      d.setDate(Math.min(d.getDate(), this.getDaysPerMonth(d.getMonth(), d.getFullYear() + 1)));
      d.setYear(d.getFullYear() + 1);

      if( !this.validateFutureDateTime(calendar.DateTimePicker.Constants.DATE_TYPE, d, true/*called from navigation*/) )
      {
        return;
      }

      this.setSelectedDate(d);
    },

    goToPreviousYear: function (event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      var d = new Date(this._selectedDate);
      d.setDate(Math.min(d.getDate(), this.getDaysPerMonth(d.getMonth(), d.getFullYear() - 1)));
      d.setYear(d.getFullYear() - 1);
      this.setSelectedDate(d);
    },

    // ---------------- Utility methods

    /**
     * Display a localized string date for the date picker pop-up
     *
     * @param date               A Date object
     * @param formatBundleKeyStr The format of the date to be displayed.
     *                           Allowed strings are: "full", "full_abr", "month_year" and "month_date_year"
     *                           The format correspond to js_calendar.properties' bundle keys
     *                           that begin with "format.".
     */
    dispDate : function (date, formatBundleKeyStr)
    {
      var month = date.getMonth();
      var day   = date.getDay();
      return calendar.util.formatDate("format." + formatBundleKeyStr,
                                      date.getFullYear(),
                                      month,
                                      date.getDate(),
                                      this.getShortMonthName(month),
                                      this.getLongMonthName(month),
                                      this.getShortDayName(day),
                                      this.getLongDayName(day) );
    },

    /**
     *  Set some attributes of this object to localized strings
     */
    initMonthDays : function ()
    {
        // strings initialised based on the js-calendar resource
        this.days = this.getStrings("day.short.", calendar.DatePicker.dayNameSuffixes);
        this.fullDays = this.getStrings("day.long.", calendar.DatePicker.dayNameSuffixes);
        this.months = this.getStrings("month.short.", calendar.DatePicker.monthNameSuffixes);
        this.fullMonths = this.getStrings("month.long.", calendar.DatePicker.monthNameSuffixes);
    },

    getStrings : function (prefix, range)
    {
        var array = new Array(range.length);
        for (var i = 0; i < range.length; i++)
        {
            array[i] = page.bundle.getString(prefix + range[i]);
        }
        return array;
    },

    getShortDayName : function(day)
    {
        return this.days[day];
    },

    getLongDayName : function (day)
    {
        return this.fullDays[day];
    },


    getShortMonthName : function(month)
    {
        return this.months[month];
    },

    getLongMonthName : function(month)
    {
        return this.fullMonths[month];
    },

    setFirstWeekDay: function (nFirstWeekDay)
    {
        if (this._firstWeekDay != nFirstWeekDay)
        {
            this._firstWeekDay = nFirstWeekDay;
            this.updateTable(0);
        }
    },

    getFirstWeekDay: function () // legacy picker.js
    {
        var strCount = page.bundle.getString("LOCALE_SETTINGS.FIRST_DAY_OF_WEEK.03207");

        if (strCount.length == 1)
        { // better defensiveness needed here-legacy picker
            this._firstWeekDay = parseInt(strCount, 10);
        }
        else
        {
            this._firstWeekDay = strCount;
        }
    },

    getDaysPerMonth: function (nMonth, nYear)
    {
        nMonth = (nMonth + 12) % 12;
        this.daysPerMonth = calendar.DatePicker._daysPerMonth[nMonth];

        if (nMonth == 1)
        {
            this.daysPerMonth += nYear % 4 === 0 && nYear % 400 !== 0 ? 1 : 0; // standard formula
        }
        return this.daysPerMonth;
    },

    setEnabled: function( enabled )
    {
      this.enabled = enabled;
      if ( this.enabled )
      {
        this.inputTextElement.enable();
        this.inputTextElement.removeClassName('disabled');
        this.dpImageLink.removeClassName('disabled');
        if (this.checkboxType) this.checkboxType.enable();
      }
      else
      {
        this.inputTextElement.value = '';
        this.inputTextElement.disable();
        this.inputTextElement.addClassName('disabled');
        this.dpImageLink.addClassName('disabled');
        if (this.checkboxType) this.checkboxType.disable();
      }
    },

    // ---------------- EventListeners to show and hide DatePicker

    /**
     * Show the date picker calendar popup
     * @param {Object} event
     */
    showPicker: function(event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      // We are allowing only one picker pop up open on a page at any given time.
      // Close all other date/time pickers that are currently open before opening another date picker.
      calendar.DateTimePicker.closeAllDateTimePickers();

      if ( !this.enabled )
      {
        return;
      }

      // position the picker relative to the image within the opener link. This is needed because IE does not
      // correctly compute the cumulative offset of the link for RTL locales. AS-116395
      var offsetElem = this.dpImageLink.down('img');
      var offset = (this.offset) ? this.offset : offsetElem.cumulativeOffset();
      if (!this.offset)
      {
        // compensate offset for img borders
        offset[0] -= 2;
        offset[1] -= 2;

        var scrollOffset = offsetElem.cumulativeScrollOffset();
        var viewportScrollOffset = document.viewport.getScrollOffsets();
        if ( this.dpImageLink.up('div.lb-content' ) )
        {
          // Fix offset inside a lightbox
          offset[0] = offset[0] - scrollOffset[0] + 2 * viewportScrollOffset[0];
          offset[1] = offset[1] - scrollOffset[1] + 2 * viewportScrollOffset[1];
        }
        else
        {
          // Fix the offset in a scrolled container
          offset[0] = offset[0] - scrollOffset[0] + viewportScrollOffset[0];
          offset[1] = offset[1] - scrollOffset[1] + viewportScrollOffset[1];
        }
      }

      this.popupElement.setStyle({display: "block"});
      var width = this.popupElement.getWidth();
      var bodyWidth = $(document.body).getWidth();

      // reposition popupElement if it goes off the screen
      if ( offset[0] + width > bodyWidth || page.util.isRTL() )
      {
        var tempOffset = ( offset[0] + this.dpImageLink.getWidth() );
        if ( tempOffset > width )
        {
          offset[0] = tempOffset - width;
        }
        // With some language packs the above logic to compute offset leads to negative value cutting portion of date picker.
        // Below logic is to handle that scenario: AS-153291
        else
        {
          offset[0] = width - tempOffset;
        }
      }

      if (this.offsetLeft)
      {
        offset[0] = this.offsetLeft;
      }
      if (this.offsetRight)
      {
        offset[0] = this.offsetRight - this.popupElement.getWidth();
      }
      if (this.offsetTop)
      {
        offset[1] = this.offsetTop;
      }
      if (this.offsetBottom)
      {
        offset[1] = this.offsetBottom - this.popupElement.getHeight();
      }
      this.popupElement.setStyle({ left: offset[0] + "px", top: offset[1] + "px"});

      var currentDate = this.getDateObjFromInternalDateTimeStr();

      // if the current selected date is null, means the input was empty, so use today's date
      this.setSelectedDate( (currentDate) ? currentDate : ( new Date() ) );
      this.updateTable(1);
      this.selectedCell.down('a').focus();
    },

    /**
     *
     * @param {Object} event
     */
    hidePicker: function(event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      this.popupElement.setStyle({display: "none"});

      if ( !this.inputTextElement.disabled )
      {
        this.inputTextElement.focus();
      }
    },

    doNothing: function(event)
    {
        Event.stop(event);
    }
}
);



// --------------------------------------------- Time Picker ---------------------------------------------

calendar.TimePicker = Class.create();
Object.extend(calendar.TimePicker.prototype, calendar.DateTimePicker.prototype);
Object.extend(calendar.TimePicker.prototype,
{
    /**
     * An encapsulation of the Time picker widget
     *
     * @param baseElement      String value for the base picker name.
     * @param timeValue        Internal datetime string for the initial time.
     * @param type             String values "start" or "end" (for the date range picker case).
     *                         May be empty string.
     * @param basePairElement  String value for the 2nd picker name (for the date range picker case).
     *                         May be empty string.
     * @param allowEmpty       Boolean string for whether input boxes for the picker may be empty.
     * @param filterFutureYear Boolean string for whether future dates should be BLOCKED from selection.
     * @param viewOnly         Boolean string for whether the picker should be in view-only mode or not
     * @param midnightWarning  String to alert the user with if they select midnight
     * @param externalValidateJsCallback   (optional) Function handle of external validation JavaScript callback
     * @param timeZoneOffset   Server timezone offset from UTC in milliseconds
     * @param defaultTimeOfDay (optional) Default time value if field is blank.  Only the hour/minute fields will be extracted from this value.
     * @param checkBoxFieldId  Check box field Id to be assosiated with the date picker for decision on the
     *                         selection of the date picker. If available then it need to be checked for
     *                         value to consider. If not available then not-null values for date and time
     *                         text boxes get considered.
     */
    initialize: function( baseElement, timeValue, type, basePairElement, allowEmpty, filterFutureYear, viewOnly, midnightWarning, externalValidateJsCallback, timeZoneOffset, defaultTimeOfDay, checkBoxFieldId )
    {
      var tpTextElement, dpTextElement, tpElement, tpImageElement, tLinkImage;

      if (type != "")
      {
        tpTextElement = calendar.DateTimePicker.Constants.TYPE_TIME_PICKER + baseElement + '_' + type + '_time';
        dpTextElement = calendar.DateTimePicker.Constants.TYPE_DATE_PICKER + baseElement + '_' + type + '_date';
        tpElement = 't_' + baseElement + '_' + type + '_time';
        tpImageElement = 'timePicker' + type + '_' + baseElement;
        tLinkImage = 'a_' + baseElement + '_' + type + '_time';
      }
      else
      {
        tpTextElement = calendar.DateTimePicker.Constants.TYPE_TIME_PICKER + baseElement + '_time';
        dpTextElement = calendar.DateTimePicker.Constants.TYPE_DATE_PICKER + baseElement + '_date';
        tpElement = 't_' + baseElement + '_time';
        tpImageElement = 'timePicker_' + baseElement;
        tLinkImage = 'a_' + baseElement + '_time';
      }

      calendar.DateTimePicker.prototype.initialize.call( this, tpElement, baseElement, basePairElement, type,
                                                         tpTextElement, dpTextElement, allowEmpty, filterFutureYear,
                                                         externalValidateJsCallback, timeZoneOffset, checkBoxFieldId );

      var is24Hr = page.bundle.getString('LOCALE_SETTINGS.24HR_SUPPORT.03208');
      if ( is24Hr == "1" )
      {
          this.is24 = true;
      }

      this.midnightWarning = midnightWarning;
      this._defaultTimeOfDay = this.getDateObjFromInternalDateTimeStr( defaultTimeOfDay );
      this.setInputsAndValues( timeValue, true );
      this.calendarErrorDivId = calendar.getDynamicDivId('calendar_nested_error');
      calendar.TimePicker.registerTimePicker(this);

      Event.observe(document.body, "click", calendar.TimePicker.closeAllTimePickers);

      this.deltaTop = 17;
      this.tpImageLink = $(tpImageElement);
      if ( this.tpImageLink )
      {
        if (viewOnly == "true") {
          Event.observe(this.tpImageLink, 'click', this.doNothing.bindAsEventListener(this));
        } else {
          Event.observe(this.tpImageLink, 'click', this.showTimePicker.bindAsEventListener(this));
        }
      }

      this.tLinkImage = $(tLinkImage);
      if ( this.tLinkImage )
      {
          Event.observe(this.tLinkImage, 'click', this.hideTimePicker.bindAsEventListener(this));
      }

      if ( this.popupElement )
      {
          var links = this.popupElement.getElementsByTagName('li');

          for (var j = 0; j < links.length; j++)
          {
              // bind on click events to all time picker time LI elements except the popup close bar LI element
              if (links[j]  && !$(links[j]).hasClassName('contextmenubar_top'))
              {
                // observe anchor <A> tag
                Event.observe( links[j], 'click',
                                 this.setTimeFromPicker.bindAsEventListener( this, links[j].childNodes[0] ));
                if (!this.firstItem)
                {
                  this.firstItem = $(links[j]).down('a');
                }
              }
          }
      }

      // Bind listener to checkbox so that the time can be automatically filled to the current datetime
      // if time initially empty, but only if the date picking portion isn't there (is time picker only)
      // because the date picker portion part of the code already has the checkbox event to auto populate
      // the date and time if those input fields are empty when the checkbox is being checked
      if ( !this.pairInputTextElement && this.checkboxType )
      {
        Event.observe(this.checkboxType, 'click', this.setCheckboxValue.bindAsEventListener(this));
      }

      if (viewOnly != "true")
      {
          Event.observe( this.popupElement, 'keydown', this.onKeyPress.bindAsEventListener( this ) );
      }

      // relocate the context menu div to the bottom of the page so that its CSS won't get messed up by parent tags -- JimR
      Element.remove(this.popupElement);
      document.body.appendChild(this.popupElement);
    },

    onKeyPress: function( event )
    {
      var key = event.keyCode || event.which;
      if ( key == Event.KEY_ESC )
      {
        this.hideTimePicker(event);
      }
    },

    /**
     * Method called onclick of a time value from the time picker.
     * It will parse the time from the picker, update time input box,
     * update the hidden date time input value, close time picker pop up,
     * and validate that the time selected is valid in the range if is
     * a date range picker.
     *
     * @param event
     * @param selectedTimeValueEle the <A> element containing localized time value from the time picker
     */
    setTimeFromPicker: function (event, selectedTimeValueEle)
    {
      // To prevent default event behavior
      Event.stop(event);

      var timeValue24HrFormat = $(selectedTimeValueEle).readAttribute("bb:time");

      // figure out the hr and minutes
      var hoursInt   = this.getHourOrMinutesInt(timeValue24HrFormat, "H");
      var minutesInt = this.getHourOrMinutesInt(timeValue24HrFormat, "M");

      // initialize the date object to be passed into the set time method
      var currDateTimeObj = this.getDateObjFromInternalDateTimeStr();
      var timeValue = !currDateTimeObj ? new Date() : currDateTimeObj;
      timeValue.setHours( hoursInt ); // date obj hrs is in 24hr format
      timeValue.setMinutes( minutesInt );

      this.hideTimePicker( event );
      this.setInputsAndValues( timeValue, false );
      if (hoursInt === 0 && minutesInt === 0 && this.midnightWarning ) {
        new page.NestedInlineConfirmation( "warning", this.midnightWarning, false, $( this._errorDivId ), true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
      }

      this.onCalendarDateTimeChange( event, false );
    },

    /**
     * Sets the time in this._selectedTime in localized string format to the time input box (this.inputTextElement)
     */
    setSelectedTimeToTextBox: function ( initial )
    {
      var tmpTime = "";

      // selected time may be null if no time picked or time was cleared
      if( this._selectedTime )
      {
        var timeOrder = page.bundle.getString("LOCALE_SETTINGS.TIME_ORDER.00519"); //HMP, MHP, PHM

        // create the localized time string
        // insert space before or after depending on where the "P" order is
        // NOTE: this same logic for showing the time is used in BaseDatePickerRenderer.java for displaying times in the time picker popup and must remain consistent
        if( timeOrder.startsWith("P") )
        {
          tmpTime = this.findTimeorder(timeOrder.substring(0,1)) + " " +
                    this.findTimeorder(timeOrder.substring(1,2)) + calendar.DateTimePicker.Constants.TIME_DELIMITER +
                    this.findTimeorder(timeOrder.substring(2,3));
        }
        else if( timeOrder.endsWith("P") )
        {
          tmpTime = this.findTimeorder(timeOrder.substring(0,1)) + calendar.DateTimePicker.Constants.TIME_DELIMITER +
                    this.findTimeorder(timeOrder.substring(1,2)) +
                    " " + this.findTimeorder(timeOrder.substring(2,3));
        }
      }

      if ( this.inputTextElement )
      {
        if ( window.widget && !initial )
        {
          widget.ShowUnsavedChanges.changeHiddenValue( this.inputTextElement, tmpTime.trim() );
        }
        else
        {
          this.inputTextElement.value = tmpTime.trim();
          this.inputTextElement.defaultValue = tmpTime.trim();
          // TODO - change validation framework to use standard DOM defaultValue attribute
          this.inputTextElement._defaultValue = tmpTime.trim();
        }
      }
    },

    /**
     * Return the hours, minutes or AM/PM stored in this._selectedTime based on the given type
     * @param type "H", "M" or "P"
     */
    findTimeorder : function (type)
    {
      switch (type)
      {
        case 'H': return (parseInt(this._selectedTime.hrs,10)).toPaddedString(2); // 12hr format if ampm set, otherwise 24hr format
        case 'M': return (parseInt(this._selectedTime.mins,10)).toPaddedString(2);
        case 'P': return this._selectedTime.ampm; // set to localized am/pm string or empty if 24hr format
      }
    },

    /**
     * Sets this._selectedTime and this._selectedHiddenTime with the given time,
     * and updates the time input box
     *
     * @param timeValue the time to be set can be of internal datetime string type or Date object type
     */
    setTime: function (timeValue)
    {
      // timeValue argument could of a Date string or Date object
      if( typeof timeValue == 'object' )
      {
        this._selectedTime = timeValue;
      }
      else if( typeof timeValue == 'string' )
      {
        this._selectedTime = (timeValue=="") ? null : this.getDateObjFromInternalDateTimeStr(timeValue);
      }

      // selected time may be null if no time picked or time was cleared
      if( this._selectedTime )
      {
        this._selectedTime.hrs  = (this._selectedTime.getHours()).toPaddedString(2); // 24hr format: 0 - 23
        this._selectedTime.mins = (this._selectedTime.getMinutes()).toPaddedString(2);

        if (this.is24)
        {
          this._selectedTime.ampm = "";
        }
        else
        {
          if( this._selectedTime.hrs < 12 )
          {
            // display the hrs in a 12hr format
            if( parseInt( this._selectedTime.hrs, 10 ) === 0 )
            {
              this._selectedTime.hrs = 12;
            }
            this._selectedTime.ampm = this.getLocalizedAmStr(); // AM
          }
          else
          {
            // display the hrs in a 12hr format
            if( this._selectedTime.hrs != 12 )
            {
              this._selectedTime.hrs = this._selectedTime.getHours() - 12;
            }
            this._selectedTime.ampm = this.getLocalizedPmStr(); // PM
          }
        }
      }

      this.setHiddenTime();
    },

    /**
     * Set the value of the hidden HTML datetime input (this._baseElement) based on
     * its current values and values in this._selectedHiddenTime in the
     * internal date time format ("2008-2-11 13:58:00")
     */
    setHiddenDateTime: function ()
    {
      if ( this._baseElement )
      {
        if ( this._selectedHiddenTime != "" )
        {
          var currInternalDateTimeStr = this._baseElement.value;
          var newInternalDateTimeStr = currInternalDateTimeStr;

          var splitDateTime = this.getInternalDateTimeStrArr(currInternalDateTimeStr);
          var internalDateStr = (splitDateTime && splitDateTime.length == 2) ? splitDateTime[0] : "";

          // get the new internal date time string based on current values in this._selectedHiddenTime
          if ( internalDateStr == "" )
          {
            var tmpDate = new Date();
            newInternalDateTimeStr = this.generateInternalDateTimeStr( "full-time",
                                                                       tmpDate.getFullYear(),
                                                                       (tmpDate.getMonth() + 1),
                                                                       tmpDate.getDate(),
                                                                       this._selectedHiddenTime );
          }
          else
          {
            newInternalDateTimeStr = this.generateInternalDateTimeStr( "full-date-time",
                                                                       internalDateStr,
                                                                       this._selectedHiddenTime );
          }

          // set the new internal date time string to the hidden HTML input
          this.setInternalDateTimeElementValue( newInternalDateTimeStr );
        }
        else
        {
          this.setEmpty();
        }
      }
    },

    /**
     * Sets this._selectedHiddenTime to an internal time format (HH:MM:00) from the time in this._selectedTime
     */
    setHiddenTime: function()
    {
      var internalTimeStr = "";

      // selected time may be null if no time picked or time was cleared
      if( this._selectedTime )
      {
        // create the internal date time string (with a bogus date b/c we don't care about the date here, just the time)
        var newInternalDateTimeStr = this.generateInternalDateTimeStr( "all",
                                                                                2000,1,1,
                                                                                this._selectedTime.getHours(),
                                                                                this._selectedTime.getMinutes() );

        var splitDateTime = this.getInternalDateTimeStrArr( newInternalDateTimeStr );

        internalTimeStr = splitDateTime[1];
      }

      // TODO REFACTOR OUT THIS ATTRIBUTE, WHY KEEP THIS SEPARATE?
      // set the internal time string to the hidden time field
      this._selectedHiddenTime = internalTimeStr;
    },

    /**
     * Converts the user-entered time field into a Date object
     */
    _getTimeValueFromString : function( prevDateTimeObj, timeStr )
    {
      // validate that a localized am/pm string is there
      var isAM = false;
      if ( !this.is24 )
      {
        // strip out AM or PM string from localized time string
        if ( timeStr.indexOf( this.getLocalizedAmStr() ) >= 0 )
        {
          isAM = true;
          timeStr = timeStr.sub( this.getLocalizedAmStr(), "" );
        }
        else if ( timeStr.indexOf( this.getLocalizedPmStr() ) >= 0 )
        {
          timeStr = timeStr.sub( this.getLocalizedPmStr(), "" );
        }
        else
        {
          // if is 12hr format and does not have am/pm string, it is not a valid input
          return null;
        }
      }

      // validate the hr and minutes
      var hoursInt = this.getHourOrMinutesInt( timeStr, "H", true );
      var minutesInt = this.getHourOrMinutesInt( timeStr, "M", true );
      if ( -1 == hoursInt || -1 == minutesInt )
      {
        // the time string is not in the right format or the hour or minutes are not integers
        return null;
      }

      // verify hour & minutes int
      if ( ( ( this.is24 && hoursInt >= 0 && hoursInt < 24 ) || ( !this.is24 && hoursInt > 0 && hoursInt <= 12 ) ) &&
             ( minutesInt >= 0 && minutesInt < 60 ) )
      {
        // initialize the date object to be passed into the setTime method
        var timeValue = new Date( prevDateTimeObj );
        if ( !this.is24 )
        {
          hoursInt = this.get12to24HrFormat( hoursInt, isAM );
        }
        timeValue.setHours( hoursInt ); // date obj hrs is in 24hr format
        timeValue.setMinutes( minutesInt );
        return timeValue;
      }
      else
      {
        // either the hour or minutes integer is not a valid hour/minute integer
        return null;
      }
    },

    _validateTimeError : function( event, focusElement )
    {
      focusElement = ( focusElement ) ? focusElement : this.inputTextElement;
      focusElement.focus();
      if ( event )
      {
        Event.stop( event );
      }
      return false;
    },

    /**
     * Validate the time string of the user's input into the date input box or
     * a given Date object.
     *
     * If valid, the time is set to various picker attributes.
     * If not valid, the previous time that was there is set to the various picker attributes
     * and an error alert is displayed.
     *
     * @param dateObjToValidate Optional argument of a Date object to validate.
     *                          If argument not provided, method will use the value in the date input text box.
     */
    validateTime : function ( event, dateObjToValidate )
    {
      // skip validation if checkbox exists and is not checked
      if ( this.checkboxType && !this.checkboxType.checked )
      {
        return true;
      }

      // previous date time string in internal format
      var prevDateTimeObj = this.getDateObjFromInternalDateTimeStr();

      var timeValue = null;
      if ( dateObjToValidate && ( typeof dateObjToValidate == 'object' ) && dateObjToValidate.getTime )
      {
        // if date object parameter passed in, no need to check date format
        timeValue = dateObjToValidate;
      }
      else
      {
        // localized time string of the user input into the time input box
        var timeStr = this.inputTextElement.value;
        if ( !timeStr )
        {
          if ( this._defaultTimeOfDay )
          {
            timeValue = new Date( prevDateTimeObj );
            timeValue.setHours( this._defaultTimeOfDay.getHours() );
            timeValue.setMinutes( this._defaultTimeOfDay.getMinutes() );
          }
          else if ( this._allowEmpty == "true" && ( this.checkboxType ? !this.checkboxType.checked : true ) )
          {
            this.setEmpty();
            return true;
          }
        }

        if ( !timeValue )
        {
          timeValue = this._getTimeValueFromString( prevDateTimeObj, timeStr );
        }
      }

      if ( !timeValue )
      {
        // time format not valid, reset to previous value and stop everything
        new page.NestedInlineConfirmation( "warning", page.bundle.getString( "timePicker.validation.invalid.time" ), false, $( this._errorDivId ), true, false/*extractCss*/, true/*insert before*/, null, null, null, null, null, this.calendarErrorDivId );
        this.setInputsAndValues( prevDateTimeObj, false );
        return this._validateTimeError( event );
      }

      // validate is not future date if future date is not allowed - method will pop its own alert if not valid
      if ( !this.validateFutureDateTime( calendar.DateTimePicker.Constants.TIME_TYPE, timeValue ) )
      {
        this.setInputsAndValues( prevDateTimeObj, false );
        return this._validateTimeError( event );
      }

      // set the time attributes in the object
      this.setInputsAndValues( timeValue, false );

      // if this is the END pair of a START/END date/time range picker, then validate the range
      if ( this.type == "end" )
      {
        // now validate the range - the range validate method will pop its own alerts if not valid
        if ( this.isValidDateTimeRange( this.checkboxType,
                                        this.getDateObjFromInternalDateTimeStr(),
                                        calendar.DateTimePicker.Constants.TIME_TYPE ) )
        {
          // if date input box is empty, set to the date in timeValue date object
          this.updateIfEmptyPairInputTextElement( event, calendar.DateTimePicker.Constants.TIME_TYPE, timeValue );
        }
        else
        {
          // set focus to start date for invalid range
          var startDate = $(calendar.DateTimePicker.Constants.TYPE_DATE_PICKER+this.basePickerName+'_start_date');
          return this._validateTimeError( event, startDate );
        }
      }

      if ( !this.runExternalValidation( timeValue, 'timePicker' ) )
      {
        return this._validateTimeError( event );
      }

      return true;
    },

    /**
     * Sets the given Date object to internal time attributes this._selectedTime,
     * this._selectedHiddenTime, and this._baseElement and update
     * the user input text box w/ the time.
     *
     * @param dateStringOrObj Date object or internal datetime string
     */
    setInputsAndValues: function( dateStringOrObj, initial )
    {
      this.setTime( dateStringOrObj, initial );
      this.setHiddenDateTime();
      this.setSelectedTimeToTextBox( initial );
    },

    // ---------------- EventListeners to show and hide time picker pop up

    showTimePicker: function(event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);
      
      // We are allowing only one picker pop up open on a page at any given time.
      // Close all other date/time pickers that are currently open before opening another time picker.
      calendar.DateTimePicker.closeAllDateTimePickers();

      var offset = this.tpImageLink.cumulativeOffset();
      var scrollOffset = this.tpImageLink.cumulativeScrollOffset();
      var viewportScrollOffset = document.viewport.getScrollOffsets();
      if ( this.tpImageLink.up('div.lb-content' ) )
      {
        // Fix offset inside a lightbox
        offset[0] = offset[0] - scrollOffset[0] + 2 * viewportScrollOffset[0];
        offset[1] = offset[1] - scrollOffset[1] + 2 * viewportScrollOffset[1];
      }
      else
      {
        // Fix the offset in a scrolled container
        offset[0] = offset[0] - scrollOffset[0] + viewportScrollOffset[0];
        offset[1] = offset[1] - scrollOffset[1] + viewportScrollOffset[1];
      }

      this.popupElement.setStyle({display: "block"});
      var width = this.popupElement.getWidth();
      var bodyWidth = $(document.body).getWidth();
      if ( page.util.isRTL() )
      {
        offset[0] = offset[0] + this.tpImageLink.getWidth() - width;
      }
      if ( offset[0] + width > bodyWidth )
      {
        offset[0] = (offset[0] + this.tpImageLink.getWidth()) - width;
      }
      this.popupElement.setStyle({ left: offset[0] + "px", top: offset[1] + this.deltaTop + "px"});
      this.firstItem.focus();
    },

    hideTimePicker: function(event)
    {
      // To prevent default event behavior (ie, going to link)
      Event.stop(event);

      this.popupElement.setStyle({display: "none"});

      if ( !this.inputTextElement.disabled )
      {
        this.inputTextElement.focus();
      }
    },

    doNothing: function(event)
    {
        Event.stop(event);
    }
}
);


// arrays that hold the date and time picker prototype objects on the page
calendar.DatePicker.datePickers = [];
calendar.TimePicker.timePickers = [];

/**
 * Adds the given date picker prototype object to a global array of date picker objects
 */
calendar.DatePicker.registerDatePicker = function(dp)
{
    calendar.DatePicker.datePickers.push(dp);
};

calendar.DatePicker.forgetPicker = function(basePickerName)
{
  var toKeep = [];
  calendar.DatePicker.datePickers.each(function(dp)
                                       {
                                         if (dp.basePickerName !== basePickerName)
                                         {
                                           toKeep.push(dp);
                                         }
                                       });
  calendar.DatePicker.datePickers = toKeep;
};

/**
 * Gets a date picker by base name -- this will always return the "end" picker in the case of a date-range picker
 */
calendar.DatePicker.getDatePicker = function(basePickerName)
{
    var retVal = null;
    calendar.DatePicker.datePickers.each(function(dp)
    {
      if (dp.basePickerName == basePickerName)
      {
        retVal = dp;
      }
    });
    return retVal;
};

/**
 * Gets the "start" date picker for a given date range picker
 * @param basePickerName
 */
calendar.DatePicker.getStartDatePicker = function(basePickerName)
{
  var retVal = null;
  calendar.DatePicker.datePickers.each(function(dp)
  {
    if (dp.basePickerName == basePickerName && dp.type == "start")
    {
      retVal = dp;
    }
  });
  return retVal;
};

/**
 * Gets the "end" date picker for a given date range picker
 * @param basePickerName
 */
calendar.DatePicker.getEndDatePicker = function(basePickerName)
{
  var retVal = null;
  calendar.DatePicker.datePickers.each(function(dp)
  {
    if (dp.basePickerName == basePickerName && dp.type == "end")
    {
      retVal = dp;
    }
  });
  return retVal;
};

/**
 * Hides the date picker popup for all the registered date pickers
 */
calendar.DatePicker.closeAllDatePickers = function()
{
    calendar.DatePicker.datePickers.each(function(dp)
    {
        dp.popupElement.setStyle({display: "none"});
    });
};

/**
 * Adds the given time picker prototype object to a global array of time picker objects
 */
calendar.TimePicker.registerTimePicker = function(tp)
{
    calendar.TimePicker.timePickers.push(tp);
};

/**
 * Hides the time picker popup for all the registered time pickers
 */
calendar.TimePicker.closeAllTimePickers = function()
{
    calendar.TimePicker.timePickers.each(function(tp)
    {
        tp.popupElement.setStyle({display: "none"});
    });
};

calendar.TimePicker.forgetPicker = function(basePickerName)
{
  var toKeep = [];
  calendar.TimePicker.timePickers.each(function(dp)
                                       {
                                         if (dp.basePickerName !== basePickerName)
                                         {
                                           toKeep.push(dp);
                                         }
                                       });
  calendar.TimePicker.timePickers = toKeep;
};

/**
 * Gets a time picker by base name -- this will always return the "end" picker in the case of a date-range picker
 */
calendar.TimePicker.getTimePicker = function(basePickerName)
{
    var retVal = null;
    calendar.TimePicker.timePickers.each(function(tp)
    {
      if (tp.basePickerName == basePickerName)
      {
        retVal = tp;
      }
    });
    return retVal;
};

/**
 * Gets the "start" time picker for a given date range picker
 * @param basePickerName
 */
calendar.TimePicker.getStartTimePicker = function(basePickerName)
{
  var retVal = null;
  calendar.TimePicker.timePickers.each(function(tp)
  {
    if (tp.basePickerName == basePickerName && tp.type == "start")
    {
      retVal = tp;
    }
  });
  return retVal;
};

/**
 * Gets the "end" date picker for a given date range picker
 * @param basePickerName
 */
calendar.TimePicker.getEndTimePicker = function(basePickerName)
{
  var retVal = null;
  calendar.TimePicker.timePickers.each(function(tp)
  {
    if (tp.basePickerName == basePickerName && tp.type == "end")
    {
      retVal = tp;
    }
  });
  return retVal;
};

/**
 * Update the appropriate background fields for form submission/validation.  Call in your onsubmit
 * before writing any custom logic validating dates.
 * NOTE that current implementation of this method is merely a call to validatePickers which is going to
 * happen again 'later' in the validation (so for the success path you will validate dates twice).
 * TODO: Refactor this method and any callers so this only updates the hidden fields and doesn't do the validation.
 */
calendar.DateTimePicker.syncPickers = function(event)
{
  return calendar.DateTimePicker.validatePickers(event);
};

/**
 * Validate the registered date and time pickers
 */
calendar.DateTimePicker.validatePickers = function(event)
{
  /* Note: The order of the validate calls is important here--
   *       DatePickers' validateDate should be called *before*
   *       TimePickers' validateTime because there is logic in
   *       the validate datetime range code that depends on it.
   *       (Validate range is only called upon the END time picker
   *       in a date range picker tag because of the change to do
   *       date validation upon form submit and not on form input
   *       change. That is when the hidden datetime input is
   *       appropriately set.)
   */

  var valid = true, index, item;

  if(calendar.DatePicker.datePickers.length > 0)
  {
    for (index = 0; index < calendar.DatePicker.datePickers.length; index++)
    {
      item = calendar.DatePicker.datePickers[index];
      if( !item.validateDate(event) )
      {
        valid = false;
      }
    }
  }

  if(calendar.TimePicker.timePickers.length > 0)
  {
    for (index = 0; index < calendar.TimePicker.timePickers.length; index++)
    {
      item = calendar.TimePicker.timePickers[index];
      if( !item.validateTime(event) )
      {
        valid = false;
      }
    }
  }

  if( !valid && event )
  {
    Event.stop( event );
  }

  return valid;
};

/**
 * Hides the picker popup for all the registered date/time pickers
 */
calendar.DateTimePicker.closeAllDateTimePickers = function()
{
  calendar.DatePicker.closeAllDatePickers();
  calendar.TimePicker.closeAllTimePickers();
};

/**
 * Contains page-wide utility methods
 */
calendar.util = {};

/**
 * Returns a localized string date.
 */
calendar.util.formatDate = function (formatBundleKeyStr, year, month, date, shortMonthName, longMonthName, shortDayName, longDayName)
{
  return page.bundle.getString( formatBundleKeyStr,
                                year,
                                month,
                                date,
                                shortMonthName,
                                longMonthName,
                                shortDayName,
                                longDayName );
};


/**
 * Set up any JavaScript that will always be run on load (that doesn't depend on
 * any application logic / localization) here.
 */
FastInit.addOnLoad( function()
{
  // set up so that validation for date and time pickers run on submit for each form on the page;
  // there should usually be only one form on the page;
  // there will definitely be at least one form on the page that contains a date picker,
  // so just observe onsubmit for all forms on the page
  var formsArr = $A(document.getElementsByTagName('form'));
  formsArr.each(function(formElement)
  {
    doubleSubmit.registerFormSubmitEvents( formElement, function(event)
		{
			return calendar.DateTimePicker.validatePickers(event);
		});
  });
});

/*
 * Returns an object with localized time words, and optionally timeDelta, and bundle key used in creating the time words
 * 
 * example..
 * 1.minimum number of keys to put in bundle properties file : 12
 *    dbui.message.age.now=Just now -> for right now (less than a minute)
 *    dbui.message.age.negative.time=({0}) -> 1
 *    dbui.message.age.posted.(minutes/hours/days/months/years) -> 5 for time variations
 *    dbui.message.age.posted.(minutes/hours/days/months/years).one -> 5 for time variations
 * ex)
 * dbui.message.age.posted.minutes = posted {0} minutes ago
 * dbui.message.age.posted.minutes.one = posted {0} minute ago
 * * dbui.message.age.posted.hours = posted {0} hours ago
 * dbui.message.age.posted.hours.one = posted {0} hour ago
 * ...
 * 
 * 2.call this function
 * var abc = calendar.util.getTimeSpan( nowInMillis, thenInMillis, "dbui.message.age.posted", "dbui.message.age.negative.time", true, true )
 * 
 * 3.access return object's properties
 * abc.timeWords; abc.key; abc.timeDelta
 * 
 * @return an object with timeWords property that can be used to display time span since thenInMillis
 * 
 * @param key : base key with which to form a key to be used to create the time words. it would be "dbui.message.age.posted" from the above example
 * @param keyForNegTime : key to use to display the absolute value of the negative time span;
 *  if not provided, then the absolute value of the negative time span will be returned 
 *    ex.) "-2 days"" -> "(2 days)" if the key provided wraps the parameter
 * @param inclTimeDelta boolean : whether to include time delta as a property (timeDelta) in the return object
 * @param inclKey boolean : whether to include key as a property (key) in the return object
 */
calendar.util.getTimeSpan = function ( nowInMillis, thenInMillis, key, keyForNegTime, inclTimeDelta, inclKey )
{
  if( !key )
  {
    // no key provided
    return null;
  }
  
  if( thenInMillis < 1 )
  {
    // no time specified
    return { timeWords : "" };
  }
  
  if ( !nowInMillis )
  {
    nowInMillis = new Date().getTime( );
  }
  
  if ( !thenInMillis )
  {
    // If we do not have a time for the event then pick 'now' to avoid an error.
    thenInMillis = nowInMillis;
  }
        
  var AVG_NUM_DAYS_IN_A_MONTH = 30.4375; // avg + leap -- (365 + .25) / 12
  
  var timeDeltaOriginal = (nowInMillis - thenInMillis) / 60000; // minutes
  var timeDeltaRtn = timeDeltaOriginal;
  var keyRtn;

  // the message could not have been posted/edited in the future, but better to show something than nothing
  // so proceed with its absolute value
  if ( timeDeltaOriginal < 0 )
  {
    timeDeltaRtn = -timeDeltaOriginal;
  }

  if ( timeDeltaRtn < 60 )
  {
    timeDeltaRtn = Math.floor( timeDeltaRtn );
    if(timeDeltaRtn === 0) //if exactly 0, then we show 'just now' instead of 0 minutes ago
    {
      keyRtn = key + ".now";
    }
    
    if(timeDeltaRtn > 0 || page.bundle.getString(keyRtn).include('!!!'))
    {
      keyRtn = key + ".minutes" + ( timeDeltaRtn == 1 ? ".one" : "" );
    }
  }
  else
  {
    timeDeltaRtn = timeDeltaRtn / 60; // hours
    if ( timeDeltaRtn < 24 )
    {
      timeDeltaRtn = Math.floor( timeDeltaRtn );
      keyRtn = key + ".hours" + ( timeDeltaRtn == 1 ? ".one" : "" );
    }
    else
    {
      timeDeltaRtn = timeDeltaRtn / 24; // days
      if ( timeDeltaRtn < ( AVG_NUM_DAYS_IN_A_MONTH ) )
      {
        timeDeltaRtn = Math.floor( timeDeltaRtn );
        keyRtn = key + ".days" + ( timeDeltaRtn == 1 ? ".one" : "" );
      }
      else
      {
        timeDeltaRtn = timeDeltaRtn / ( AVG_NUM_DAYS_IN_A_MONTH ); // months
        if ( timeDeltaRtn < 12 )
        {
          timeDeltaRtn = Math.floor( timeDeltaRtn );
          keyRtn = key + ".months" + ( timeDeltaRtn == 1 ? ".one" : "" );
        }
        else
        {
          timeDeltaRtn = timeDeltaRtn / 12; // years
          timeDeltaRtn = Math.floor( timeDeltaRtn );
          keyRtn = key + ".years" + ( timeDeltaRtn == 1 ? ".one" : "" );
        }
      }
    }
  }
  
  var timeWordsRtn = page.bundle.getString( keyRtn, timeDeltaRtn );
  //TODO - we consider up to -0.99999 to be same 0 and do not display it as negative time. 
  //need to check callstack to find out why for 0 time (e.g. posting a comment in discussionboard)
  //displays the time difference as a negative fraction of 0
  // timeWords override for negative time -- we put the whole wording within pair of parentheses
  if ( timeDeltaOriginal < -1 )
  {
    if( keyForNegTime )
    {
      timeWordsRtn = page.bundle.getString( keyForNegTime, timeDeltaRtn );
    }
  }
  
  var objRtn = {};
  objRtn.timeWords = timeWordsRtn;
  if ( inclTimeDelta )
  {
    objRtn.timeDelta = timeDeltaRtn;
  }
  if ( inclKey )
  {
    objRtn.key = keyRtn;
  }

  return objRtn;
};
