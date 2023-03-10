/* Area:	ffi_call
   Purpose:	Check structures.
   Limitations:	none.
   PR:		none.
   Originator:	From the original ffitest.c  */

/* { dg-do run } */
#include "ffitest.h"

typedef struct
{
  unsigned char uc;
  double d;
  unsigned int ui;
} test_structure_1;

static test_structure_1 ABI_ATTR struct1(test_structure_1 ts, test_structure_1 ts1)
{
  ts.uc++;
  ts.d--;
  ts.ui++;
  CHECK (ts1.uc == 2);
  CHECK (ts1.d == 4.0);
  CHECK (ts1.ui == 100);
  return ts;
}

int main (void)
{
  ffi_cif cif;
  ffi_type *args[MAX_ARGS];
  void *values[MAX_ARGS];
  ffi_type ts1_type;
  ffi_type *ts1_type_elements[4];

  test_structure_1 ts1_arg1, ts1_arg2;

  /* This is a hack to get a properly aligned result buffer */
  test_structure_1 *ts1_result =
    (test_structure_1 *) malloc (sizeof(test_structure_1));

  ts1_type.size = 0;
  ts1_type.alignment = 0;
  ts1_type.type = FFI_TYPE_STRUCT;
  ts1_type.elements = ts1_type_elements;
  ts1_type_elements[0] = &ffi_type_uchar;
  ts1_type_elements[1] = &ffi_type_double;
  ts1_type_elements[2] = &ffi_type_uint;
  ts1_type_elements[3] = NULL;
  
  args[0] = &ts1_type;
  values[0] = &ts1_arg1;
  args[1] = &ts1_type;
  values[1] = &ts1_arg2;

  /* Initialize the cif */
  CHECK(ffi_prep_cif(&cif, ABI_NUM, 2,
		     &ts1_type, args) == FFI_OK);
  
  ts1_arg1.uc = '\x01';
  ts1_arg1.d = 3.14159;
  ts1_arg1.ui = 555;

  ts1_arg2.uc = 2;
  ts1_arg2.d = 4.0;
  ts1_arg2.ui = 100;


  ffi_call(&cif, FFI_FN(struct1), ts1_result, values);
  
  CHECK(ts1_result->ui == 556);
  CHECK(ts1_result->d == 3.14159 - 1);
 
  free (ts1_result);
  exit(0);
}
