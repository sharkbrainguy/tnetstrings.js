#!/usr/bin/env python
import sys
import tnetstrings
import json

for line in sys.stdin.readlines():
    try:
        value, _ = tnetstrings.parse(line)

        if type(value) == str:
            value = json.loads(value)

        print "succeeded: %s %s" % (type(value), value)


    except Exception as err:
        print "failed: %s" % (err,) 
